from uow.unit_of_work import UnitOfWork
from models.categoria import Categoria
from schemas.categoria import CategoriaCreate, CategoriaUpdate
from fastapi import HTTPException, status
from datetime import datetime

def get_all(uow: UnitOfWork):
    return uow.categorias.get_all()

def get_by_id(uow: UnitOfWork, id: int):
    cat = uow.categorias.get_by_id(id)
    if not cat:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return cat

def create(uow: UnitOfWork, data: CategoriaCreate):
    cat = Categoria(**data.model_dump())
    uow.categorias.add(cat)
    return cat

def update(uow: UnitOfWork, id: int, data: CategoriaUpdate):
    cat = get_by_id(uow, id)
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(cat, key, value)
    cat.updated_at = datetime.utcnow()
    uow.categorias.add(cat)
    return cat

def soft_delete(uow: UnitOfWork, id: int):
    cat = get_by_id(uow, id)
    cat.deleted_at = datetime.utcnow()
    uow.categorias.add(cat)
