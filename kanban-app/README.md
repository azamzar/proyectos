# 🧠 Kanban App (Trello-like)

Aplicación Kanban fullstack estilo Trello construida con **Laravel + React 19 + Redux Toolkit + Vite**, con soporte para **drag & drop**, edición inline y persistencia en base de datos.

---

## 🚀 Stack Tecnológico

### Frontend

* React 19
* Vite
* Redux Toolkit
* Axios
* @dnd-kit (drag & drop moderno)

### Backend

* Laravel (API REST)
* SQLite

---

## 📁 Estructura del Proyecto

```bash
kanban-app/
├── backend/    # API Laravel
└── frontend/   # React + Vite
```

---

## ⚙️ Instalación

### 1️⃣ Backend (Laravel)

```bash
cd backend

composer install

cp .env.example .env
php artisan key:generate

# Configurar SQLite en .env
DB_CONNECTION=sqlite

# Crear DB
touch database/database.sqlite

php artisan migrate

php artisan serve
```

---

### 2️⃣ Frontend (React + Vite)

```bash
cd frontend

npm install

# Crear archivo .env
echo "VITE_API_URL=http://127.0.0.1:8000/api" > .env

npm run dev
```

---

## 🌐 API Base URL

Configurada en:

```js
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default api;
```

---

## 🧩 Funcionalidades

### 🃏 Cards

* Crear tarjetas
* Editar título y descripción (inline)
* Reordenar:

  * Dentro de la columna (↑ ↓)
  * Entre columnas (← →)
* Drag & Drop fluido
* Persistencia en base de datos

---

### 📦 Columnas

* Visualización de columnas (IDs 1, 2, 3)
* Edición inline del nombre
* Guardado automático en backend

---

### 🧠 Drag & Drop

* Implementado con `@dnd-kit`
* Overlay flotante (UX tipo Trello)
* Sin glitches ni rebotes

---

## 🧠 Arquitectura Frontend

```bash
src/
├── app/
│   └── store.js
├── features/
│   ├── cards/
│   │   ├── cardsSlice.js
│   │   ├── cardsAPI.js
│   │   └── components...
│   ├── columns/
│   │   ├── columnsSlice.js
│   │   └── ColumnsPage.jsx
│   └── dnd/
│       └── SortableCard.jsx
```

---

## 🔄 Estado Global (Redux)

### Cards Slice

* `fetchCards`
* `createCard`
* `reorderCard`
* `updateCard`
* `updateLocal` (optimistic UI)

### Columns Slice

* `fetchColumns`
* `updateColumn`
* `updateColumnLocal`

---

## 🔗 Endpoints API

### Columns

```http
GET    /api/columns
PUT    /api/columns/{id}
```

### Cards

```http
GET    /api/cards
POST   /api/cards
POST   /api/cards/reorder
PUT    /api/cards/{id}
```

---

## ⚙️ Backend (Laravel)

### CardController

* `index()` → cards por columnas [1,2,3]
* `store()` → crea card con posición automática
* `reorder()` → lógica completa de movimiento
* `update()` → edita título y descripción

---

### ColumnController

* `index()` → devuelve columnas visibles
* `update()` → actualiza nombre

---

## 🐛 Problemas Resueltos

* ❌ HMR issues (CRA) → migración a Vite
* ❌ Drag & drop incompatible → uso de @dnd-kit
* ❌ Cards desaparecían → fix en fetch + backend
* ❌ Rebote en drag → desactivar animaciones conflictivas
* ❌ Edición no persistía → Redux + sync local
* ❌ Columnas incorrectas → fix en ColumnController
* ❌ Redux no actualizaba → fix en `extraReducers`

---

## 🎨 UI/UX

* Diseño tipo Kanban moderno
* Cards flotantes con drag overlay
* Inputs inline (sin modales)
* Interacciones rápidas (optimistic updates)

---

## 🔜 Roadmap

* [ ] Drag entre columnas avanzado
* [ ] Modal de card (detalle completo)
* [ ] Etiquetas / labels
* [ ] Usuarios / autenticación
* [ ] Persistencia multi-tablero
* [ ] UI estilo SaaS (Trello / Linear)

---

## 🧪 Desarrollo

```bash
# Backend
php artisan serve

# Frontend
npm run dev
```

---

## 📌 Notas

* Solo se usan columnas `[1,2,3]` para simplificar desarrollo
* SQLite permite setup rápido sin servidor externo
* Arquitectura preparada para escalar a SaaS

---

## 🧠 Autor

Proyecto desarrollado como base para una aplicación Kanban profesional con stack moderno.

---

## ⭐ Contribuciones

Pull requests y mejoras son bienvenidas.
