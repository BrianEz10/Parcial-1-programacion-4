from fastapi import APIRouter, HTTPException, status
from uow.unit_of_work import UnitOfWork
from services import categoria_service
from schemas.categoria import CategoriaCreate, CategoriaUpdate, CategoriaRead
from typing import List

router = APIRouter()

@router.get("/", response_model=List[CategoriaRead])
def listar_categorias():
    with UnitOfWork() as uow:
        return categoria_service.get_all(uow)

@router.get("/{categoria_id}", response_model=CategoriaRead)
def obtener_categoria(categoria_id: int):
    with UnitOfWork() as uow:
        return categoria_service.get_by_id(uow, categoria_id)

@router.post("/", response_model=CategoriaRead, status_code=status.HTTP_201_CREATED)
def crear_categoria(data: CategoriaCreate):
    with UnitOfWork() as uow:
        return categoria_service.create(uow, data)

@router.patch("/{categoria_id}", response_model=CategoriaRead)
def actualizar_categoria(categoria_id: int, data: CategoriaUpdate):
    with UnitOfWork() as uow:
        return categoria_service.update(uow, categoria_id, data)

@router.delete("/{categoria_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_categoria(categoria_id: int):
    with UnitOfWork() as uow:
        categoria_service.soft_delete(uow, categoria_id)
