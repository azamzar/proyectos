🧠 Kanban App (Trello-like)

Aplicación Kanban fullstack estilo Trello construida con Laravel + React 19 + Redux Toolkit + Vite, con soporte para drag & drop avanzado, edición inline, modal de detalle y persistencia en base de datos.

🚀 Stack Tecnológico
Frontend
React 19
Vite
Redux Toolkit
Axios
@dnd-kit (drag & drop moderno y performante)
CSS custom (kanban.css)
Backend
Laravel (API REST)
MySQL
📁 Estructura del Proyecto
kanban-app/
├── backend/    # API Laravel
└── frontend/   # React + Vite
⚙️ Instalación
1️⃣ Backend (Laravel)
cd backend

composer install

cp .env.example .env
php artisan key:generate

# Configurar MyQSL en .env

php artisan migrate

php artisan serve
2️⃣ Frontend (React + Vite)
cd frontend

npm install

# Crear archivo .env
echo "VITE_API_URL=http://127.0.0.1:8000/api" > .env

npm run dev
🌐 API Base URL

Configurada en:

// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default api;
🧩 Funcionalidades
🃏 Cards
Crear tarjetas
Editar título y descripción
Modal de detalle completo
Drag & Drop fluido
Reordenar:
Dentro de la columna
Entre columnas
Persistencia en base de datos
Optimistic updates
✨ Mejora UX implementada

Las cards ya NO rompen el layout cuando el contenido es largo.

Se implementó:

🔹 Truncado por caracteres con JavaScript
🔹 Visualización completa solo dentro del modal
🔹 Layout estable y consistente

Función usada:

function truncateText(text, maxLength = 100) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

Aplicado en SortableCard.jsx:

<div className="card-title">
  {truncateText(card.title, 50)}
</div>

<div className="card-description">
  {truncateText(card.description, 100) || "Sin descripción"}
</div>
📦 Columnas
Visualización dinámica desde backend
Edición inline del nombre
Guardado automático
Soporte drag & drop de cards entre columnas
🧠 Drag & Drop

Implementado con @dnd-kit:

DndContext
SortableContext
useSortable
DragOverlay

Características:

Overlay flotante estilo Trello
Sin rebotes visuales
animateLayoutChanges: () => false para evitar glitches
Manejo manual de activeId, activeType, activeCard
🧠 Arquitectura Frontend
src/
├── app/
│   └── store.js
├── features/
│   ├── cards/
│   │   ├── cardsSlice.js
│   │   ├── cardsAPI.js
│   │   └── ...
│   ├── columns/
│   │   ├── columnsSlice.js
│   │   └── ColumnsPage.jsx
│   ├── dnd/
│   │   └── SortableCard.jsx
│   └── ui/
│       └── uiSlice.js   # Control del modal
├── services/
│   └── api.js
└── styles/
    └── kanban.css
🔄 Estado Global (Redux)
🃏 Cards Slice
fetchCards
createCard
reorderCard
updateCard
updateLocal (optimistic UI)
📦 Columns Slice
fetchColumns
updateColumn
updateColumnLocal
🧩 UI Slice
openCardModal(cardId)
Control de estado del modal activo
🔗 Endpoints API
Columns
GET    /api/columns
PUT    /api/columns/{id}
Cards
GET    /api/cards
POST   /api/cards
POST   /api/cards/reorder
PUT    /api/cards/{id}
⚙️ Backend (Laravel)
CardController
index() → devuelve cards agrupadas por columna
store() → crea card con posición automática
reorder() → lógica completa de movimiento entre columnas
update() → edita título y descripción
ColumnController
index() → devuelve columnas visibles
update() → actualiza nombre
🐛 Problemas Resueltos
❌ HMR issues (CRA) → migración a Vite
❌ Drag & drop incompatible → migración a @dnd-kit
❌ Cards desaparecían → fix en fetch + backend
❌ Rebote en drag → control manual de animaciones
❌ Edición no persistía → sincronización Redux + backend
❌ Columnas incorrectas → fix en controller
❌ Redux no actualizaba → corrección en extraReducers
❌ Cards rompían el layout → truncado por JS
❌ CSS line-clamp inconsistente → reemplazado por solución determinista
🎨 UI / UX
Diseño oscuro moderno
Hover states suaves
Drag handle dedicado
Modal limpio y centrado
Inputs estilizados
Scroll interno en modal
Cards compactas y consistentes
🔜 Roadmap
 Etiquetas / labels
 Checklist dentro de card
 Usuarios / autenticación
 Multi-tablero
 Animaciones más avanzadas
 Persistencia en tiempo real (WebSockets)
 UI estilo SaaS profesional
🧪 Desarrollo
# Backend
php artisan serve

# Frontend
npm run dev
📌 Notas Técnicas Importantes
Arquitectura preparada para escalar
Separación clara entre:
estado UI
estado de dominio
persistencia backend
Drag & drop desacoplado del render principal
🧠 Estado Actual del Proyecto

La aplicación ya tiene:

Drag & drop funcional y estable
Persistencia completa
Modal de detalle
Layout consistente
UX sólida
Base preparada para evolucionar a SaaS
⭐ Contribuciones

Pull requests y mejoras son bienvenidas.