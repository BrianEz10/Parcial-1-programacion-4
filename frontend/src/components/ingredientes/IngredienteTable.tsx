import { useNavigate } from "react-router-dom";
import { useCrud } from "../../hooks/useCrud";
import { ingredientesApi } from "../../api/ingredientes";
import type { Ingrediente } from "../../types";

interface IngredienteTableProps {
  items: Ingrediente[];
}

export default function IngredienteTable({ items }: IngredienteTableProps) {
  const navigate = useNavigate();
  const { eliminar, isEliminando } = useCrud(['ingredientes'], ingredientesApi);

  const handleEliminar = (id: number, nombre: string) => {
    if (!window.confirm(`¿Eliminar el ingrediente "${nombre}"?`)) return;
    eliminar(id);
  };

  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Alérgeno</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {items.map((ing) => (
            <tr key={ing.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ing.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {ing.es_alergeno ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-600 uppercase">Sí</span>
                ) : (
                  <span className="text-gray-300 text-xs">No</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                <button onClick={() => navigate(`/ingredientes/${ing.id}/editar`)} className="text-orange-600 hover:text-orange-900">Editar</button>
                <button onClick={() => handleEliminar(ing.id, ing.nombre)} disabled={isEliminando} className="text-red-600 hover:text-red-900 disabled:opacity-40">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
