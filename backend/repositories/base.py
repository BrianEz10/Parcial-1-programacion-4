from sqlmodel import Session, select
from typing import List, Optional, TypeVar, Generic, Type

T = TypeVar("T")

class BaseRepository(Generic[T]):
    def __init__(self, session: Session, model: Type[T]):
        self.session = session
        self.model = model

    def get_all(self) -> List[T]:
        stmt = select(self.model).where(self.model.deleted_at.is_(None))
        return self.session.exec(stmt).all()

    def get_by_id(self, id: int) -> Optional[T]:
        stmt = select(self.model).where(self.model.id == id, self.model.deleted_at.is_(None))
        return self.session.exec(stmt).first()

    def add(self, entity: T):
        self.session.add(entity)

    def delete(self, entity: T):
        self.session.delete(entity)
