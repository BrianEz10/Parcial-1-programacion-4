# Parcial 1 - Programación 4: Tienda de Comida

Este proyecto es una aplicación web full-stack para la gestión de un catálogo de comida, permitiendo administrar categorías, productos e ingredientes con una arquitectura desacoplada y profesional.

## 🚀 Tecnologías Utilizadas

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **ORM**: SQLModel (basado en SQLAlchemy y Pydantic)
- **Base de Datos**: SQLite (configurada por defecto)
- **Arquitectura**: Repository Pattern, Unit of Work (UOW) y Layered Architecture (Routers -> Services -> Repositories).

### Frontend
- **Framework**: React 18+ con Vite
- **Lenguaje**: TypeScript
- **Gestión de Estado**: TanStack Query (React Query) v5
- **Estilos**: Tailwind CSS
- **Arquitectura**: Componentes modulares, Custom Hooks genéricos y separación de Layout.

---

## 🛠️ Instalación y Configuración

### 1. Configurar el Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Configurar el Frontend
```bash
cd frontend
npm install
npm run dev
```
