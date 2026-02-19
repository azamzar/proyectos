from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Optional
import uvicorn
import uuid
import logging
import traceback
from datetime import datetime
from supervisor import process_security_alert
from config import config

logger = logging.getLogger("soc.webhook")

# Validar configuración al iniciar
try:
    config.validate_required_config()
    logger.info("Configuración de APIs validada correctamente")
except ValueError as e:
    logger.error("Error de configuración: %s", e)
    logger.info("Revisa tu archivo .env y asegúrate de tener todas las API keys requeridas")

app = FastAPI(title="SOC Webhook Server - PRODUCCIÓN", version="1.0.0")

class SecurityAlert(BaseModel):
    source: str
    alert_type: str
    severity: str
    message: str
    source_ip: Optional[str] = None
    destination_ip: Optional[str] = None
    url: Optional[str] = None
    file_hash: Optional[str] = None
    timestamp: Optional[str] = None
    email_recipient: Optional[str] = None
    real_apis: Optional[bool] = True

# Storage simple para el demo — dict indexado por incident_id
incidents_db: dict = {}


def _process_alert_background(alert_data: dict, incident_id: str, processing_context: dict):
    """Procesa la alerta en background y actualiza incidents_db cuando termina."""
    try:
        logger.info("Background: iniciando procesamiento de %s", incident_id)
        result = process_security_alert(alert_data, incident_id, processing_context)

        incidents_db[incident_id].update({
            "status": result.get("status", "completed"),
            "result": result,
            "tools_used": result.get("tools_used", []),
            "completed_at": datetime.now().isoformat(),
        })
        logger.info("Background: alerta %s procesada. Tools: %s",
                     incident_id, result.get("tools_used", []))

    except Exception as e:
        logger.error("Background: error procesando %s: %s", incident_id, e)
        logger.debug("Traceback:\n%s", traceback.format_exc())
        incidents_db[incident_id].update({
            "status": "error",
            "error": str(e),
            "completed_at": datetime.now().isoformat(),
        })


@app.post("/webhook/alert")
async def receive_alert(alert: SecurityAlert, background_tasks: BackgroundTasks):
    """Recibe alertas de seguridad, responde inmediato y procesa en background."""
    try:
        incident_id = f"INC-{datetime.now().strftime('%Y%m%d%H%M%S')}-{str(uuid.uuid4())[:6]}"

        alert_data = alert.model_dump()
        alert_data["timestamp"] = alert_data.get("timestamp") or datetime.now().isoformat()
        alert_data["incident_id"] = incident_id

        logger.info("Alerta recibida: %s | tipo=%s severidad=%s",
                     incident_id, alert.alert_type, alert.severity)

        processing_context = {
            "email_recipient": alert_data.get("email_recipient"),
            "use_real_apis": alert_data.get("real_apis", True)
        }

        # Registrar con status "processing" antes de lanzar el background task
        incidents_db[incident_id] = {
            "incident_id": incident_id,
            "status": "processing",
            "alert_data": alert_data,
            "received_at": datetime.now().isoformat(),
            "completed_at": None,
            "result": None,
        }

        # Lanzar procesamiento en background — respuesta inmediata al cliente
        background_tasks.add_task(
            _process_alert_background, alert_data, incident_id, processing_context
        )

        return {
            "status": "processing",
            "incident_id": incident_id,
            "message": "Alerta aceptada. Procesamiento en curso.",
        }

    except Exception as e:
        logger.error("Error aceptando alerta: %s", e)
        logger.debug("Traceback:\n%s", traceback.format_exc())

        raise HTTPException(
            status_code=500,
            detail={
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
        )

@app.get("/incidents/{incident_id}")
async def get_incident(incident_id: str):
    """Consulta el estado de un incidente individual."""
    incident = incidents_db.get(incident_id)
    if not incident:
        raise HTTPException(status_code=404, detail=f"Incidente {incident_id} no encontrado")
    return incident


@app.get("/incidents")
async def get_incidents():
    """Obtiene lista de incidentes procesados."""
    return {
        "incidents": list(incidents_db.values()),
        "total_incidents": len(incidents_db),
        "last_updated": datetime.now().isoformat()
    }

@app.get("/health")
async def health_check():
    """Health check del sistema con estado de APIs"""
    
    # Verificar estado básico de configuración
    health_status = {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "total_incidents_processed": len(incidents_db),
        "api_configuration": {
            "openai": "configured" if config.OPENAI_API_KEY else "missing",
            "tavily": "configured" if config.TAVILY_API_KEY else "missing",
            "virustotal": "configured" if config.VIRUSTOTAL_API_KEY else "missing",
            "gmail_credentials": "configured" if config.GMAIL_CREDENTIALS_FILE else "missing"
        }
    }

    missing_apis = [k for k, v in health_status["api_configuration"].items() if v == "missing"]

    if missing_apis:
        health_status["status"] = "degraded"
        health_status["warnings"] = f"APIs faltantes: {', '.join(missing_apis)}"

    return health_status

@app.get("/api-status")
async def api_status():
    """Estado detallado de todas las APIs externas"""
    
    status = {
        "timestamp": datetime.now().isoformat(),
        "apis": {
            "openai": {
                "configured": bool(config.OPENAI_API_KEY),
                "description": "LLM para agentes multiagente",
                "required": True
            },
            "tavily": {
                "configured": bool(config.TAVILY_API_KEY),
                "description": "Búsqueda web para AI agents",
                "required": True,
                "free_tier": "1000 búsquedas/mes"
            },
            "virustotal": {
                "configured": bool(config.VIRUSTOTAL_API_KEY), 
                "description": "Análisis de IOCs real",
                "required": True,
                "rate_limits": "4 requests/min (gratis)"
            },
            "gmail": {
                "configured": bool(config.GMAIL_CREDENTIALS_FILE),
                "description": "Envío real de notificaciones",
                "required": False,
                "setup_required": "Google Cloud Console + OAuth2"
            },
            "abuseipdb": {
                "configured": False,
                "description": "Threat intelligence de IPs (no configurado)",
                "required": False,
                "free_tier": "1000 requests/día"
            }
        }
    }
    
    return status

if __name__ == "__main__":
    logger.info("Iniciando servidor webhook SOC...")
    logger.info("Puerto: %s", config.WEBHOOK_PORT)
    logger.info("OpenAI: %s", "OK" if config.OPENAI_API_KEY else "FALTA")
    logger.info("Tavily: %s", "OK" if config.TAVILY_API_KEY else "FALTA")
    logger.info("VirusTotal: %s", "OK" if config.VIRUSTOTAL_API_KEY else "FALTA")
    logger.info("Gmail: %s", "OK" if config.GMAIL_CREDENTIALS_FILE else "no configurado (opcional)")
    logger.info("Dashboard: http://localhost:8501")
    logger.info("API Health: http://localhost:%s/health", config.WEBHOOK_PORT)

    uvicorn.run(app, host="0.0.0.0", port=config.WEBHOOK_PORT)