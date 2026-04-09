import {
  createAlbum,
  deleteAlbum,
  findAlbumById,
  listAlbums,
  updateAlbum,
} from '../services/albumsService.js'

function parseListQuery(query) {
  const page = Math.max(Number(query.page) || 1, 1)
  const limit = Math.min(Math.max(Number(query.limit) || 6, 1), 20)
  const search = query.search?.trim() || ''

  return { page, limit, search }
}

export async function getAlbums(req, res, next) {
  try {
    const options = parseListQuery(req.query)
    const result = await listAlbums(options)

    res.json(result)
  } catch (error) {
    next(error)
  }
}

export async function getAlbumById(req, res, next) {
  try {
    const album = await findAlbumById(req.params.id)

    if (!album) {
      return res.status(404).json({ message: 'Álbum não encontrado.' })
    }

    res.json(album)
  } catch (error) {
    next(error)
  }
}

export async function postAlbum(req, res, next) {
  try {
    const album = await createAlbum(req.body)

    res.status(201).json(album)
  } catch (error) {
    next(error)
  }
}

export async function putAlbum(req, res, next) {
  try {
    const album = await updateAlbum(req.params.id, req.body)

    if (!album) {
      return res.status(404).json({ message: 'Álbum não encontrado.' })
    }

    res.json(album)
  } catch (error) {
    next(error)
  }
}

export async function removeAlbum(req, res, next) {
  try {
    const wasDeleted = await deleteAlbum(req.params.id)

    if (!wasDeleted) {
      return res.status(404).json({ message: 'Álbum não encontrado.' })
    }

    res.status(204).send()
  } catch (error) {
    next(error)
  }
}
