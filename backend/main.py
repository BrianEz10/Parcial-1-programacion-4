import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import create_db_and_tables
from routers import categoria_router, producto_router, ingrediente_router

app = FastAPI(title="Comida API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(categoria_router.router, prefix="/api/categorias", tags=["Categorías"])
app.include_router(producto_router.router, prefix="/api/productos", tags=["Productos"])
app.include_router(ingrediente_router.router, prefix="/api/ingredientes", tags=["Ingredientes"])

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
