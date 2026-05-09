import { useNavigate } from "react-router-dom";
import { useCrud } from "../../hooks/useCrud";
import { categoriasApi } from "../../api/categorias";
import type { Categoria } from "../../types";

interface CategoriaTableProps {
  items: Categoria[];
}

export default function CategoriaTable({ items }: CategoriaTableProps) {
  const navigate = useNavigate();
  const { eliminar, isEliminando } = useCrud(['categorias'], categoriasApi);

  const handleEliminar = (id: number, nombre: string) => {
    if (!window.confirm(`¿Eliminar la categoría "${nombre}"?`)) return;
    eliminar(id);
  };

  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Padre</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {items.map((cat) => (
            <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cat.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {cat.parent_id ? items.find(c => c.id === cat.parent_id)?.nombre : <span className="text-gray-300 italic">Ninguna</span>}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                <button onClick={() => navigate(`/categorias/${cat.id}/editar`)} className="text-orange-600 hover:text-orange-900">Editar</button>
                <button onClick={() => handleEliminar(cat.id, cat.nombre)} disabled={isEliminando} className="text-red-600 hover:text-red-900 disabled:opacity-40">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
