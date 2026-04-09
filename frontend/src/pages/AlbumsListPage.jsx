import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { deleteAlbum, fetchAlbums } from '../api/albums'
import AlbumCard from '../components/AlbumCard'

function AlbumsListPage() {
  const [albums, setAlbums] = useState([])
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 })
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    let ignore = false

    async function loadAlbums() {
      try {
        setIsLoading(true)
        setError('')
        const response = await fetchAlbums({ page: meta.page, limit: 6, search })

        if (!ignore) {
          setAlbums(response.data)
          setMeta(response.meta)
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.response?.data?.message || 'Não foi possível carregar os álbuns.')
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadAlbums()

    return () => {
      ignore = true
    }
  }, [meta.page, search])

  function handleSearchSubmit(event) {
    event.preventDefault()
    setMeta((current) => ({ ...current, page: 1 }))
    setSearch(searchInput.trim())
  }

  async function handleDelete(id) {
    if (deletingId) {
      return
    }

    if (!window.confirm('Deseja excluir este álbum?')) {
      return
    }

    try {
      setDeletingId(id)
      await deleteAlbum(id)

      if (albums.length === 1 && meta.page > 1) {
        setMeta((current) => ({ ...current, page: current.page - 1 }))
      } else {
        const response = await fetchAlbums({ page: meta.page, limit: 6, search })
        setAlbums(response.data)
        setMeta(response.meta)
      }
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Não foi possível excluir o álbum.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Coleção de álbuns
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
            Consulte, cadastre, edite e remova álbuns.
          </h1>
          <p className="mt-3 text-slate-300">
            Este catálogo demonstra um fluxo CRUD simples com paginação, consumo de API
            e validação básica.
          </p>
        </div>

        <Link
          to="/albums/new"
          className="rounded-2xl bg-emerald-300 px-5 py-3 text-center font-semibold text-slate-950 transition hover:bg-emerald-200"
        >
          Adicionar álbum
        </Link>
      </div>

      <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Buscar por título ou artista"
          className="flex-1 rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-300"
        />
        <button
          type="submit"
          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
        >
          Buscar
        </button>
      </form>

      {error ? (
        <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
          {error}
        </div>
      ) : null}

      {isLoading ? <p className="text-slate-300">Carregando álbuns...</p> : null}

      {!isLoading && albums.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center text-slate-300">
          <p className="text-lg text-white">Nenhum álbum encontrado.</p>
          <p className="mt-2">Tente outra busca ou cadastre um novo álbum.</p>
        </div>
      ) : null}

      {albums.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onDelete={handleDelete}
              isDeleting={deletingId === album.id}
              disableDelete={Boolean(deletingId)}
            />
          ))}
        </div>
      ) : null}

      <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300 md:flex-row">
        <p>
          Página {meta.page} de {meta.totalPages}. Total de álbuns: {meta.total}.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setMeta((current) => ({ ...current, page: current.page - 1 }))}
            disabled={meta.page === 1 || isLoading}
            className="rounded-2xl border border-white/10 px-4 py-2 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            type="button"
            onClick={() => setMeta((current) => ({ ...current, page: current.page + 1 }))}
            disabled={meta.page >= meta.totalPages || isLoading}
            className="rounded-2xl border border-white/10 px-4 py-2 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </section>
  )
}

export default AlbumsListPage
