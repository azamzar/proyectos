# SOC Multi-Agent System

Sistema multiagente de operaciones de seguridad (SOC) construido con LangGraph. Proyecto desarrollado como parte de un curso de LangChain.

## Arquitectura

El sistema usa una arquitectura **supervisor + 3 agentes especializados**:

```
                    ┌──────────────┐
                    │  Supervisor  │
                    └──────┬───────┘
              ┌────────────┼────────────┐
              v            v            v
    ┌─────────────┐ ┌─────────────┐ ┌──────────────┐
    │   Alert     │ │   Threat    │ │ Notification │
    │  Analyzer   │ │  Analyzer   │ │    Agent     │
    └─────────────┘ └─────────────┘ └──────────────┘
     VirusTotal      TavilySearch      Gmail API
     TavilySearch
```

1. **Alert Analyzer** - Analiza IOCs (IPs, URLs, hashes) con VirusTotal y busca contexto con TavilySearch. Determina si es verdadero o falso positivo.
2. **Threat Analyzer** - Evalua severidad, identifica TTPs y propone mitigaciones (solo si es verdadero positivo).
3. **Notification Agent** - Envia un email con el reporte completo via Gmail API.

## Requisitos previos

- Python 3.10+
- API keys:
  - **OpenAI** - para el LLM (gpt-4o-mini)
  - **Tavily** - busqueda web para threat intelligence
  - **VirusTotal** - analisis de IOCs
- (Opcional) **Google Cloud Console** - para notificaciones por email:
  1. Crear proyecto en [Google Cloud Console](https://console.cloud.google.com/)
  2. Habilitar Gmail API
  3. Crear credenciales OAuth 2.0 (tipo "Aplicacion de escritorio")
  4. Descargar el JSON como `credentials.json` en la raiz del proyecto
  5. Ejecutar `python generate_token.py` para generar `token.json`

## Instalacion

```bash
git clone <url-del-repo>
cd soc_multiagent

python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
```

## Configuracion

Copia el archivo de ejemplo y rellena tus claves:

```bash
cp .env.example .env
```

Edita `.env` con tus API keys reales.

## Como ejecutar

### 1. Iniciar el servidor webhook

```bash
python webhook_server.py
```

El servidor se levanta en `http://localhost:8000`.

### 2. (Opcional) Iniciar el dashboard

```bash
streamlit run dashboard.py
```

Se abre en `http://localhost:8501`.

### 3. Enviar una alerta de prueba

```bash
curl -X POST http://localhost:8000/webhook/alert \
  -H "Content-Type: application/json" \
  -d '{
    "source": "test",
    "alert_type": "Malware Detection",
    "severity": "High",
    "message": "Actividad sospechosa detectada desde IP externa",
    "source_ip": "45.33.32.156",
    "file_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  }'
```

### Endpoints disponibles

| Endpoint | Metodo | Descripcion |
|---|---|---|
| `/webhook/alert` | POST | Recibe y procesa alertas de seguridad |
| `/incidents` | GET | Lista de incidentes procesados |
| `/health` | GET | Estado del sistema y APIs |
| `/api-status` | GET | Estado detallado de cada API |
