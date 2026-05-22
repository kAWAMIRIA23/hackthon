import os
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np
from sklearn.utils.class_weight import compute_class_weight


def main():
    base_dir = os.path.dirname(__file__)

    # Configurable paths
    dataset_path = os.environ.get('DATASET_PATH', os.path.join(base_dir, 'dataset-resized'))
    models_dir = os.path.join(base_dir, 'models')
    os.makedirs(models_dir, exist_ok=True)
    save_path = os.environ.get('MODEL_PATH', os.path.join(models_dir, 'waste_classification_model.h5'))

    print(f"Using dataset path: {dataset_path}")
    print(f"Model will be saved to: {save_path}")

    # Parameters
    categories = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']
    img_size = (128, 128)
    batch_size = 32

    # Data generators
    data_gen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=40,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        fill_mode='nearest',
        validation_split=0.2
    )

    train_data = data_gen.flow_from_directory(
        dataset_path,
        target_size=img_size,
        batch_size=batch_size,
        class_mode='categorical',
        subset='training'
    )

    val_data = data_gen.flow_from_directory(
        dataset_path,
        target_size=img_size,
        batch_size=batch_size,
        class_mode='categorical',
        subset='validation'
    )

    # Compute class weights
    class_labels = train_data.classes
    class_weights_arr = compute_class_weight(
        class_weight='balanced',
        classes=np.unique(class_labels),
        y=class_labels
    )
    class_weights = dict(enumerate(class_weights_arr))

    # Build model with MobileNetV2 base
    base_model = tf.keras.applications.MobileNetV2(input_shape=(128, 128, 3), include_top=False, weights='imagenet')
    # Fine-tune last 50 layers
    for layer in base_model.layers[:-50]:
        layer.trainable = False

    model = Sequential([
        base_model,
        GlobalAveragePooling2D(),
        Dense(128, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(0.01)),
        Dropout(0.6),
        Dense(len(categories), activation='softmax')
    ])

    # Compile
    lr_schedule = tf.keras.optimizers.schedules.ExponentialDecay(
        initial_learning_rate=1e-4,
        decay_steps=10000,
        decay_rate=0.9
    )
    optimizer = tf.keras.optimizers.Adam(learning_rate=lr_schedule)

    model.compile(optimizer=optimizer, loss='categorical_crossentropy', metrics=['accuracy'])

    # Train
    from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
    early_stopping = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)
    checkpoint = ModelCheckpoint(save_path, monitor='val_loss', save_best_only=True)

    print('Starting training...')
    history = model.fit(
        train_data,
        epochs=50,
        validation_data=val_data,
        callbacks=[early_stopping, checkpoint],
        class_weight=class_weights
    )

    print(f'Training finished. Best model saved to: {save_path}')


if __name__ == '__main__':
    main()
