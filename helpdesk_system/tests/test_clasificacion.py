"""Tests para HelpdeskGraph: funciones de enrutamiento y nodos."""
from unittest.mock import MagicMock, patch
import pytest


@pytest.fixture
def helpdesk_graph():
    """Crea una instancia de HelpdeskGraph sin conexiones reales."""
    with patch("graph.ChatOpenAI"), \
         patch("graph.VectorRAGSystem"):
        from graph import HelpdeskGraph
        grafo = HelpdeskGraph()
        return grafo


class TestDecidirDesdeClasificacion:
    def test_automatico_retorna_respuesta_final(self, helpdesk_graph):
        state = {"categoria": "automatico"}
        assert helpdesk_graph.decidir_desde_clasificacion(state) == "respuesta_final"

    def test_escalado_retorna_escalado(self, helpdesk_graph):
        state = {"categoria": "escalado"}
        assert helpdesk_graph.decidir_desde_clasificacion(state) == "escalado"

    def test_valor_desconocido_retorna_escalado(self, helpdesk_graph):
        state = {"categoria": "otro_valor"}
        assert helpdesk_graph.decidir_desde_clasificacion(state) == "escalado"

    def test_sin_categoria_retorna_escalado(self, helpdesk_graph):
        state = {}
        assert helpdesk_graph.decidir_desde_clasificacion(state) == "escalado"


class TestDecidirDesdeHumano:
    def test_con_respuesta_retorna_procesar_humano(self, helpdesk_graph):
        state = {"respuesta_humano": "Solucion al problema"}
        assert helpdesk_graph.decidir_desde_humano(state) == "procesar_humano"

    def test_sin_respuesta_retorna_esperar(self, helpdesk_graph):
        state = {"respuesta_humano": ""}
        assert helpdesk_graph.decidir_desde_humano(state) == "esperar"

    def test_respuesta_none_retorna_esperar(self, helpdesk_graph):
        state = {}
        assert helpdesk_graph.decidir_desde_humano(state) == "esperar"


class TestPrepararEscalado:
    def test_requiere_humano_es_true(self, helpdesk_graph):
        state = {}
        resultado = helpdesk_graph.preparar_escalado(state)
        assert resultado["requiere_humano"] is True

    def test_historial_contiene_mensaje(self, helpdesk_graph):
        state = {}
        resultado = helpdesk_graph.preparar_escalado(state)
        assert len(resultado["historial"]) > 0


class TestGenerarRespuestaFinal:
    def test_con_respuesta_final_existente_no_sobreescribe(self, helpdesk_graph):
        state = {"respuesta_final": "Respuesta del humano", "respuesta_rag": "Otra cosa"}
        resultado = helpdesk_graph.generar_respuesta_final(state)
        # No debe incluir respuesta_final en el resultado (no la sobreescribe)
        assert "respuesta_final" not in resultado

    def test_sin_respuesta_final_usa_rag(self, helpdesk_graph):
        state = {
            "respuesta_final": None,
            "respuesta_rag": "Respuesta del RAG",
            "fuentes": ["doc1.md"],
        }
        resultado = helpdesk_graph.generar_respuesta_final(state)
        assert "Respuesta del RAG" in resultado["respuesta_final"]
        assert "doc1.md" in resultado["respuesta_final"]

    def test_sin_respuesta_final_sin_fuentes(self, helpdesk_graph):
        state = {
            "respuesta_final": None,
            "respuesta_rag": "Respuesta sin fuentes",
            "fuentes": [],
        }
        resultado = helpdesk_graph.generar_respuesta_final(state)
        assert resultado["respuesta_final"] == "Respuesta sin fuentes"
