#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from sklearn.preprocessing import FunctionTransformer


def preprocess_text(text):
    text = text.lower()
    return text

def preprocess_texts(texts):
    return [preprocess_text(t) for t in texts]

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'yassir_hackathon_backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
