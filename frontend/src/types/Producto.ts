export interface CategoriaEnProducto {
    categoria_id: number;
    nombre: string;
    es_principal: boolean;
}

export interface IngredienteEnProducto {
    ingrediente_id: number;
    nombre: string;
    es_removible: boolean;
    es_alergeno: boolean;
}

export interface Producto {
    id: number;
    nombre: string;
    descripcion: string | null;
    precio_base: number;
    imagenes_url: string[] | null;
    stock_cantidad: number;
    disponible: boolean;
    categorias: CategoriaEnProducto[];
    ingredientes: IngredienteEnProducto[];
    created_at: string;
    updated_at: string;
}

export interface CategoriaLink {
    categoria_id: number;
    es_principal: boolean;
}

export interface IngredienteLink {
    ingrediente_id: number;
    es_removible: boolean;
}

export interface ProductoCreate {
    nombre: string;
    descripcion?: string;
    precio_base: number;
    imagenes_url?: string[];
    stock_cantidad: number;
    disponible: boolean;
    categorias: CategoriaLink[];
    ingredientes: IngredienteLink[];
}

export interface ProductoUpdate extends Partial<ProductoCreate> { }
