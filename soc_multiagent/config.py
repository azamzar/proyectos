import os
import logging
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Configurar logging estructurado una sola vez
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

def _resolve_path(value):
    """Si el valor es solo un nombre de archivo, lo resuelve relativo a BASE_DIR."""
    if value and os.sep not in value and "/" not in value:
        return os.path.join(BASE_DIR, value)
    return value

class Config:
    # API Keys principales
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
    VIRUSTOTAL_API_KEY = os.getenv("VIRUSTOTAL_API_KEY")

    # Gmail Configuration
    GMAIL_CREDENTIALS_FILE = _resolve_path(os.getenv("GOOGLE_APPLICATION_CREDENTIALS"))
    GMAIL_TOKEN_FILE = _resolve_path(os.getenv("GMAIL_TOKEN"))
    
    # SOC Email Configuration
    SOC_EMAIL_RECIPIENT = os.getenv("SOC_EMAIL_RECIPIENT")
    SOC_EMAIL_SENDER = os.getenv("SOC_EMAIL_SENDER")
    
    # APIs opcionales para Threat Intelligence
    # ABUSEIPDB_API_KEY = os.getenv("ABUSEIPDB_API_KEY")
    # URLVOID_API_KEY = os.getenv("URLVOID_API_KEY")
    
    # Configuración del SOC
    WEBHOOK_PORT = 8000
    DASHBOARD_PORT = 8501

    # Validación de configuración crítica
    @classmethod
    def validate_required_config(cls):
        required_keys = [
            ("OPENAI_API_KEY", cls.OPENAI_API_KEY),
            ("TAVILY_API_KEY", cls.TAVILY_API_KEY),
            ("VIRUSTOTAL_API_KEY", cls.VIRUSTOTAL_API_KEY)
        ]
       
        missing_keys = [key for key, value in required_keys if not value]

        if missing_keys:
            raise ValueError(f"Faltan las siguientes variables de entorno: {', '.join(missing_keys)}")
        
        return True
    
config = Config()