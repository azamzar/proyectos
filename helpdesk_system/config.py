import os
import logging
from pathlib import Path

from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Directorio base del proyecto
BASE_DIR = Path(__file__).resolve().parent

# --- Rutas ---
DOCS_PATH = str(BASE_DIR / "docs")
CHROMADB_PATH = str(BASE_DIR / "chroma_db")
DB_PATH = str(BASE_DIR / "helpdesk.db")

# --- API Keys ---
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

# --- Modelos ---
LLM_MODEL = os.getenv("LLM_MODEL", "gpt-4o-mini")
EMBEDDINGS_MODEL = os.getenv("EMBEDDINGS_MODEL", "text-embedding-3-large")

# --- Parametros LLM ---
LLM_TEMPERATURE = 0.1
LLM_TEMPERATURE_RAG = 0.0

# --- Parametros RAG ---
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200
RETRIEVER_K = 4

# --- Umbral de confianza ---
CONFIDENCE_THRESHOLD = 0.60

# --- Logging ---
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()

logging.basicConfig(
    level=getattr(logging, LOG_LEVEL, logging.INFO),
    format="%(asctime)s [%(name)s] %(levelname)s: %(message)s",
    datefmt="%H:%M:%S",
)
