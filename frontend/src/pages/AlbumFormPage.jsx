import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import AlbumForm from '../components/AlbumForm'
import { createAlbum, fetchAlbum, updateAlbum } from '../api/albums'

const emptyForm = {
  title: '',
  artist: '',
  genre: '',
  releaseYear: '',
  label: '',
  coverUrl: '',
  tracksCount: '',
}

function getClientErrors(formData) {
  const errors = {}

  if (!formData.title.trim()) errors.title = 'O título é obrigatório.'
  if (!formData.artist.trim()) errors.artist = 'O artista é obrigatório.'
  if (!formData.genre.trim()) errors.genre = 'O gênero é obrigatório.'

  const releaseYear = Number(formData.releaseYear)
  if (!Number.isInteger(releaseYear) || releaseYear < 1900 || releaseYear > 2100) {
    errors.releaseYear = 'O ano de lançamento deve estar entre 1900 e 2100.'
  }

  const tracksCount = Number(formData.tracksCount)
  if (!Number.isInteger(tracksCount) || tracksCount < 1 || tracksCount > 99) {
    errors.tracksCount = 'A quantidade de faixas deve estar entre 1 e 99.'
  }

  if (formData.coverUrl.trim()) {
    try {
      new URL(formData.coverUrl)
    } catch {
      errors.coverUrl = 'A URL da capa deve ser um link válido.'
    }
  }

  return errors
}

function mapApiErrors(responseErrors = []) {
  return responseErrors.reduce((accumulator, error) => {
    accumulator[error.field] = error.message
    return accumulator
  }, {})
}

function AlbumFormPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(isEditing)
  const [isSaving, setIsSaving] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    if (!isEditing) {
      setLoadFailed(false)
      return undefined
    }

    let ignore = false

    async function loadAlbum() {
      try {
        setIsLoading(true)
        setFeedback('')
        const album = await fetchAlbum(id)

        if (!ignore) {
          setFormData({
            title: album.title,
            artist: album.artist,
            genre: album.genre,
            releaseYear: String(album.releaseYear),
            label: album.label || '',
            coverUrl: album.coverUrl || '',
            tracksCount: String(album.tracksCount),
          })
          setLoadFailed(false)
        }
      } catch (requestError) {
        if (!ignore) {
          setFeedback(requestError.response?.data?.message || 'Não foi possível carregar o álbum.')
          setLoadFailed(true)
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
  }, [id, isEditing])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => ({
      ...current,
      [name]: '',
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const clientErrors = getClientErrors(formData)
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors)
      return
    }

    const payload = {
      ...formData,
      releaseYear: Number(formData.releaseYear),
      tracksCount: Number(formData.tracksCount),
      label: formData.label.trim(),
      coverUrl: formData.coverUrl.trim(),
    }

    try {
      setIsSaving(true)
      setFeedback('')

      const album = isEditing
        ? await updateAlbum(id, payload)
        : await createAlbum(payload)

      navigate(`/albums/${album.id}`)
    } catch (requestError) {
      const responseData = requestError.response?.data
      setFeedback(responseData?.message || 'Não foi possível salvar o álbum.')
      setErrors(mapApiErrors(responseData?.errors))
      setIsSaving(false)
    }
  }

  if (isEditing && loadFailed && !isLoading) {
    return (
      <section className="mx-auto max-w-4xl rounded-3xl border border-rose-400/20 bg-rose-400/10 p-8 text-rose-100">
        <p>{feedback}</p>
        <Link to="/" className="mt-4 inline-flex text-sm font-medium text-white underline">
          Voltar para álbuns
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            {isEditing ? 'Editar álbum' : 'Novo álbum'}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {isEditing ? 'Atualize as informações do álbum' : 'Cadastre um novo álbum'}
          </h1>
        </div>

        <Link to="/" className="text-sm font-medium text-slate-300 underline">
          Voltar para álbuns
        </Link>
      </div>

      {feedback ? (
        <div className="mb-6 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
          {feedback}
        </div>
      ) : null}

      {isLoading ? (
        <p className="text-slate-300">Carregando álbum...</p>
      ) : (
        <AlbumForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isSaving={isSaving}
          submitLabel={isEditing ? 'Salvar alterações' : 'Criar álbum'}
        />
      )}
    </section>
  )
}

export default AlbumFormPage
