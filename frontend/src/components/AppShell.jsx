import { Link, NavLink, Outlet } from 'react-router-dom'

function AppShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/" className="text-2xl font-semibold tracking-tight text-white">
              Jammming
            </Link>
            <p className="mt-1 text-sm text-slate-400">
              Um CRUD fullstack simples de álbuns com React, Express e MySQL.
            </p>
          </div>

          <nav className="flex gap-3 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${
                  isActive ? 'bg-white text-slate-950' : 'bg-white/5 text-slate-200 hover:bg-white/10'
                }`
              }
            >
              Álbuns
            </NavLink>
            <NavLink
              to="/albums/new"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${
                  isActive ? 'bg-emerald-300 text-slate-950' : 'bg-emerald-300/90 text-slate-950 hover:bg-emerald-200'
                }`
              }
            >
              Novo álbum
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 px-6 py-6 text-center text-sm text-slate-400">
        Desenvolvido por Gustavo Muniz
      </footer>
    </div>
  )
}

export default AppShell
