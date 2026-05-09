import { useNavigate } from "react-router-dom";
import { useCrud } from "../hooks/useCrud";
import { productosApi } from "../api/productos";
import PageHeader from "../components/ui/PageHeader";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function ProductosPage() {
  const navigate = useNavigate();

  const { items: productos, isLoading, error, eliminar, isEliminando: isPending } = useCrud(['productos'], productosApi);

  const handleEliminar = (id: number, nombre: string) => {
    if (!window.confirm(`¿Eliminar el producto "${nombre}"?`)) return;
    eliminar(id);
  };

  return (
    <div>
      <PageHeader
        title="Productos"
        description="Administrá el catálogo de productos."
        action={
          <button
            onClick={() => navigate("/productos/nuevo")}
            className="px-4 py-2 rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            + Nuevo producto
          </button>
        }
      />

      {error && <ErrorMessage message={error.message} />}

      {isLoading ? (
        <div className="text-center py-12 text-gray-400 text-sm">Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((p) => (
            <div key={p.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-100 relative group">
                {p.imagenes_url && p.imagenes_url[0] ? (
                  <img src={p.imagenes_url[0]} alt={p.nombre} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">Sin imagen</div>
                )}
                {!p.disponible && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">No disponible</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900">{p.nombre}</h3>
                  <span className="text-orange-600 font-bold">${p.precio_base}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {p.categorias.map(c => (
                    <span key={c.categoria_id} className={`text-[10px] px-1.5 py-0.5 rounded-full ${c.es_principal ? 'bg-orange-100 text-orange-700 font-medium' : 'bg-gray-100 text-gray-600'}`}>
                      {c.nombre}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <button onClick={() => navigate(`/productos/${p.id}/editar`)} className="flex-1 py-1.5 rounded-md border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">Editar</button>
                  <button onClick={() => handleEliminar(p.id, p.nombre)} disabled={isPending} className="flex-1 py-1.5 rounded-md border border-red-100 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors">Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
