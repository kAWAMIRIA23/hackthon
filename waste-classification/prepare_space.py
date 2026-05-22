import os
import shutil
from pathlib import Path

ROOT = Path(__file__).parent
SPACE_DIR = ROOT / 'space_repo'

INCLUDE = False

def copy_if_exists(src: Path, dst: Path):
    if src.exists():
        if src.is_dir():
            shutil.copytree(src, dst, dirs_exist_ok=True)
        else:
            shutil.copy2(src, dst)

def prepare(include_model: bool = False):
    if SPACE_DIR.exists():
        shutil.rmtree(SPACE_DIR)
    SPACE_DIR.mkdir()

    files_to_copy = [
        'app.py',
        'utils.py',
        'requirements.txt',
        'README.md',
        'HF_DEPLOY.md',
    ]

    for fname in files_to_copy:
        copy_if_exists(ROOT / fname, SPACE_DIR / fname)

    # Static assets (optional small files)
    copy_if_exists(ROOT / 'static', SPACE_DIR / 'static')

    if include_model:
        # copy models and add gitattributes for LFS
        copy_if_exists(ROOT / 'models', SPACE_DIR / 'models')
        gitattributes = "*.h5 filter=lfs diff=lfs merge=lfs -text\n"
        with open(SPACE_DIR / '.gitattributes', 'w', encoding='utf-8') as f:
            f.write(gitattributes)

    print(f"Prepared Space contents in: {SPACE_DIR}")


if __name__ == '__main__':
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument('--include-model', action='store_true', help='Include models/ and add .gitattributes for git-lfs')
    args = p.parse_args()
    prepare(include_model=args.include_model)
