"""
Retrain waste classifier with phased fine-tuning and stronger weights for underperforming classes.
"""
import json
import os

import numpy as np
import tensorflow as tf
from sklearn.utils.class_weight import compute_class_weight
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
from tensorflow.keras.layers import Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.models import Sequential
from tensorflow.keras.preprocessing.image import ImageDataGenerator


def main():
    base_dir = os.path.dirname(__file__)
    dataset_path = os.environ.get("DATASET_PATH", os.path.join(base_dir, "dataset-resized"))
    models_dir = os.path.join(base_dir, "models")
    os.makedirs(models_dir, exist_ok=True)
    save_path = os.environ.get("MODEL_PATH", os.path.join(models_dir, "waste_classification_model.h5"))
    indices_path = os.path.join(models_dir, "class_indices.json")

    img_size = (128, 128)
    batch_size = 32
    categories = ["cardboard", "glass", "metal", "paper", "plastic", "trash"]

    train_gen = ImageDataGenerator(
        rescale=1.0 / 255,
        rotation_range=25,
        width_shift_range=0.15,
        height_shift_range=0.15,
        shear_range=0.1,
        zoom_range=0.15,
        horizontal_flip=True,
        fill_mode="nearest",
        validation_split=0.2,
    )
    val_gen = ImageDataGenerator(rescale=1.0 / 255, validation_split=0.2)

    train_data = train_gen.flow_from_directory(
        dataset_path,
        target_size=img_size,
        batch_size=batch_size,
        class_mode="categorical",
        subset="training",
        shuffle=True,
    )
    val_data = val_gen.flow_from_directory(
        dataset_path,
        target_size=img_size,
        batch_size=batch_size,
        class_mode="categorical",
        subset="validation",
        shuffle=False,
    )

    # Save canonical label order from Keras (alphabetical folder names)
    with open(indices_path, "w", encoding="utf-8") as f:
        json.dump(train_data.class_indices, f, indent=2)
    print(f"Class indices: {train_data.class_indices}")

    balanced = compute_class_weight(
        class_weight="balanced",
        classes=np.unique(train_data.classes),
        y=train_data.classes,
    )
    # Metal & trash are most confused; plastic is over-predicted — boost/penalize
    class_weights = {
        0: float(balanced[0]),
        1: float(balanced[1]) * 1.1,
        2: float(balanced[2]) * 2.2,
        3: float(balanced[3]),
        4: float(balanced[4]) * 0.75,
        5: float(balanced[5]) * 1.8,
    }
    print(f"Class weights: {class_weights}")

    def build_model(trainable_base: bool):
        base = MobileNetV2(
            input_shape=(128, 128, 3),
            include_top=False,
            weights="imagenet",
        )
        base.trainable = trainable_base
        if trainable_base:
            for layer in base.layers[:-35]:
                layer.trainable = False

        model = Sequential(
            [
                base,
                GlobalAveragePooling2D(),
                Dense(256, activation="relu", kernel_regularizer=tf.keras.regularizers.l2(0.01)),
                Dropout(0.5),
                Dense(len(categories), activation="softmax"),
            ]
        )
        return model

    checkpoint = ModelCheckpoint(save_path, monitor="val_accuracy", save_best_only=True, mode="max")
    early_stop = EarlyStopping(monitor="val_loss", patience=8, restore_best_weights=True)
    reduce_lr = ReduceLROnPlateau(monitor="val_loss", factor=0.5, patience=3, min_lr=1e-6)

    # Phase 1: train head only
    print("Phase 1: training classification head (frozen MobileNetV2)...")
    model = build_model(trainable_base=False)
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
        loss="categorical_crossentropy",
        metrics=["accuracy"],
    )
    model.fit(
        train_data,
        epochs=12,
        validation_data=val_data,
        class_weight=class_weights,
        callbacks=[checkpoint, early_stop, reduce_lr],
        verbose=1,
    )

    # Phase 2 (optional): short fine-tune — disabled by default because it often
    # overfits and hurts metal/plastic balance on this dataset size.
    if os.environ.get("ENABLE_PHASE2", "").lower() in ("1", "true", "yes"):
        print("Phase 2: fine-tuning top MobileNetV2 layers...")
        model = build_model(trainable_base=True)
        model.compile(
            optimizer=tf.keras.optimizers.Adam(learning_rate=5e-5),
            loss="categorical_crossentropy",
            metrics=["accuracy"],
        )
        model.fit(
            train_data,
            epochs=8,
            validation_data=val_data,
            class_weight=class_weights,
            callbacks=[checkpoint, early_stop, reduce_lr],
            verbose=1,
        )

    model.save(save_path)
    print(f"Done. Model saved to: {save_path}")


if __name__ == "__main__":
    main()
