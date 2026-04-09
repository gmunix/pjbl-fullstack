import { Link } from 'react-router-dom'

const fallbackCover =
  'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80'

function AlbumCard({ album, onDelete, isDeleting, disableDelete }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-lg shadow-slate-950/20">
      <img
        src={album.coverUrl || fallbackCover}
        alt={`Capa do álbum ${album.title}`}
        className="h-56 w-full object-cover"
      />

      <div className="space-y-4 p-5">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            {album.genre}
          </p>
          <h2 className="text-xl font-semibold text-white">{album.title}</h2>
          <p className="text-sm text-slate-300">{album.artist}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-950/70 p-3 text-sm text-slate-300">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Ano</p>
            <p>{album.releaseYear}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Faixas</p>
            <p>{album.tracksCount}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            to={`/albums/${album.id}`}
            className="flex-1 rounded-2xl bg-white px-4 py-3 text-center font-medium text-slate-950 transition hover:bg-slate-200"
          >
            Ver detalhes
          </Link>
          <button
            type="button"
            onClick={() => onDelete(album.id)}
            disabled={disableDelete}
            className="rounded-2xl border border-rose-400/30 px-4 py-3 font-medium text-rose-200 transition hover:bg-rose-400/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? 'Removendo...' : 'Excluir'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default AlbumCard
