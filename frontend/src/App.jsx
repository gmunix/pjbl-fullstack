function App() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur">
        <span className="w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-200">
          Jammming
        </span>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Albums CRUD in progress
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-300">
            The project structure is ready. Next steps are the albums API, MySQL
            integration, and the three React screens required by the assignment.
          </p>
        </div>
      </div>
    </main>
  )
}

export default App
