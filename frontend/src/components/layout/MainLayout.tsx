import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { to: "/categorias", label: "Categorías" },
  { to: "/productos", label: "Productos" },
  { to: "/ingredientes", label: "Ingredientes" },
];

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-6 sticky top-0 z-10">
        <span className="font-bold text-orange-500 text-lg mr-4">
          Tienda De Comida
        </span>
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `text-sm font-medium pb-0.5 transition-colors ${
                isActive
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-600 hover:text-orange-400"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <main className="px-6 py-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};
