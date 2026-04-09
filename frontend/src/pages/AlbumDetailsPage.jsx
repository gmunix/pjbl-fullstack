import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { deleteAlbum, fetchAlbum } from '../api/albums'

const fallbackCover =
  'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80'

function AlbumDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [album, setAlbum] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadAlbum() {
      try {
        setIsLoading(true)
        setError('')
        const data = await fetchAlbum(id)

        if (!ignore) {
          setAlbum(data)
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.response?.data?.message || 'Não foi possível carregar o álbum.')
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadAlbum()

    return () => {
      ignore = true
    }
  }, [id])

  async function handleDelete() {
    if (!window.confirm('Deseja excluir este álbum?')) {
      return
    }

    try {
      setIsDeleting(true)
      await deleteAlbum(id)
      navigate('/')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Não foi possível excluir o álbum.')
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return <p className="text-slate-300">Carregando álbum...</p>
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-6 text-rose-100">
        <p>{error}</p>
        <Link to="/" className="mt-4 inline-flex text-sm font-medium text-white underline">
          Voltar para álbuns
        </Link>
      </div>
    )
  }

  if (!album) {
    return null
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <img
        src={album.coverUrl || fallbackCover}
        alt={`Capa do álbum ${album.title}`}
        className="h-full min-h-80 w-full rounded-3xl object-cover"
      />

      <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            {album.genre}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">{album.title}</h1>
          <p className="mt-2 text-lg text-slate-300">{album.artist}</p>
        </div>

        <dl className="grid grid-cols-2 gap-4 rounded-3xl bg-slate-950/70 p-5 text-sm text-slate-300">
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Ano de lançamento</dt>
            <dd className="mt-1 text-base text-white">{album.releaseYear}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Faixas</dt>
            <dd className="mt-1 text-base text-white">{album.tracksCount}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Gravadora</dt>
            <dd className="mt-1 text-base text-white">{album.label || 'Não informada'}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Adicionado em</dt>
            <dd className="mt-1 text-base text-white">
              {new Date(album.createdAt).toLocaleDateString('pt-BR')}
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-3">
          <Link
            to={`/albums/${album.id}/edit`}
            className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-950 transition hover:bg-slate-200"
          >
            Editar álbum
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-2xl border border-rose-400/30 px-5 py-3 font-medium text-rose-200 transition hover:bg-rose-400/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? 'Removendo...' : 'Excluir álbum'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default AlbumDetailsPage
