# 🧠 Kanban App Premium (Trello-like)

Aplicación Kanban Fullstack profesional construida con **Laravel + React 19 + Redux Toolkit**. Esta plataforma permite a múltiples usuarios gestionar sus propios tableros de forma aislada, con una experiencia de usuario fluida y un diseño "Dark Mode" de alta gama.

---

## 🚀 Características Principales

### 🔐 Autenticación y Seguridad
* **Sistema de Sesiones**: Implementado con Laravel Sanctum.
* **Aislamiento de Datos (Multi-tenancy)**: Cada usuario tiene su propio tablero y columnas. Es imposible ver o editar tareas de otros usuarios.
* **Protección de Rutas**: Acceso restringido al tablero mediante tokens de autenticación persistentes.

### 📋 Gestión de Tableros
* **Auto-Onboarding**: Al registrarse, el sistema crea automáticamente un tablero predeterminado y tres columnas iniciales (*To Do, En progreso, Hecho*).
* **Drag & Drop Avanzado**: Movimiento de tarjetas entre columnas con feedback visual suave utilizando `@dnd-kit`.
* **Edición Inline**: Creación y edición rápida de tarjetas y columnas.

### 🎨 UI/UX Profesional
* **Interfaz Premium**: Diseño oscuro (Dark Mode) inspirado en herramientas como Linear y Vercel.
* **Microinteracciones**: Efectos de profundidad, sombras dinámicas y transiciones suaves en formularios.
* **Diseño Responsivo**: Adaptado para trabajar cómodamente en pantallas de escritorio.

---

## 🛠️ Stack Tecnológico

### Frontend
* **React 19** + **Vite** (Velocidad de desarrollo ultra rápida).
* **Redux Toolkit** (Gestión de estado global para auth, columnas y tarjetas).
* **@dnd-kit** (Sistema de arrastrar y soltar moderno y accesible).
* **Axios** (Comunicación con la API con interceptores de tokens).

### Backend
* **Laravel 11** (API REST robusta).
* **Laravel Sanctum** (Autenticación basada en tokens).
* **MySQL / SQLite** (Soporte para múltiples bases de datos).
* **Transacciones DB**: Garantizan la integridad de los datos durante el registro de usuarios.

---

## ⚙️ Instalación y Configuración

### 1️⃣ Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate

# Configura tu base de datos en el .env y ejecuta:
php artisan migrate
php artisan serve

### 2️⃣ Frontend (React)
cd frontend
npm install

# Configura tu URL de API en .env
echo "VITE_API_URL=[http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)" > .env

npm run dev

### Estructura del Proyecto
kanban-app/
├── backend/
│   ├── app/Http/Controllers/Api/  # Lógica de Auth, Boards y Cards
│   ├── app/Models/                # Modelos con relaciones (User -> Board -> Column)
│   └── routes/api.php             # Rutas protegidas por Sanctum
└── frontend/
    ├── src/features/              # Slices de Redux (auth, cards, columns)
    ├── src/components/            # Componentes UI (Kanban, Forms, DnD)
    └── src/styles/                # CSS Modular (auth.css, kanban.css)