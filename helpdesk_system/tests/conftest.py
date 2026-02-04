import sys
from pathlib import Path

# Insertar directorio raiz del proyecto en sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
