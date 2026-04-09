const initialValues = {
  title: '',
  artist: '',
  genre: '',
  releaseYear: '',
  label: '',
  coverUrl: '',
  tracksCount: '',
}

function Field({ label, name, value, onChange, error, type = 'text', placeholder }) {
  return (
    <label className="space-y-2 text-sm text-slate-200">
      <span className="block font-medium">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-300"
      />
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
    </label>
  )
}

function AlbumForm({ formData = initialValues, errors = {}, onChange, onSubmit, isSaving, submitLabel }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Título"
          name="title"
          value={formData.title}
          onChange={onChange}
          error={errors.title}
          placeholder="Random Access Memories"
        />
        <Field
          label="Artista"
          name="artist"
          value={formData.artist}
          onChange={onChange}
          error={errors.artist}
          placeholder="Daft Punk"
        />
        <Field
          label="Gênero"
          name="genre"
          value={formData.genre}
          onChange={onChange}
          error={errors.genre}
          placeholder="Eletrônico"
        />
        <Field
          label="Ano de lançamento"
          name="releaseYear"
          type="number"
          value={formData.releaseYear}
          onChange={onChange}
          error={errors.releaseYear}
          placeholder="2013"
        />
        <Field
          label="Gravadora"
          name="label"
          value={formData.label}
          onChange={onChange}
          error={errors.label}
          placeholder="Columbia"
        />
        <Field
          label="Quantidade de faixas"
          name="tracksCount"
          type="number"
          value={formData.tracksCount}
          onChange={onChange}
          error={errors.tracksCount}
          placeholder="13"
        />
      </div>

      <Field
        label="URL da capa"
        name="coverUrl"
        value={formData.coverUrl}
        onChange={onChange}
        error={errors.coverUrl}
        placeholder="https://exemplo.com/capa.jpg"
      />

      <button
        type="submit"
        disabled={isSaving}
        className="rounded-2xl bg-emerald-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? 'Salvando...' : submitLabel}
      </button>
    </form>
  )
}

export default AlbumForm
