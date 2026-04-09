import pool from '../config/db.js'

function mapAlbumPayload(payload) {
  return [
    payload.title,
    payload.artist,
    payload.genre,
    payload.releaseYear,
    payload.label || null,
    payload.coverUrl || null,
    payload.tracksCount,
  ]
}

export async function listAlbums({ page, limit, search }) {
  const offset = (page - 1) * limit
  const searchTerm = `%${search}%`
  const whereClause = search ? 'WHERE title LIKE ? OR artist LIKE ?' : ''
  const params = search ? [searchTerm, searchTerm] : []
  const safeLimit = Number(limit)
  const safeOffset = Number(offset)

  const [rows] = await pool.query(
    `SELECT id, title, artist, genre, release_year AS releaseYear, label, cover_url AS coverUrl,
      tracks_count AS tracksCount, created_at AS createdAt
     FROM albums
     ${whereClause}
     ORDER BY created_at DESC
     LIMIT ${safeLimit} OFFSET ${safeOffset}`,
    params,
  )

  const [countRows] = await pool.execute(
    `SELECT COUNT(*) AS total
     FROM albums
     ${whereClause}`,
    params,
  )

  return {
    data: rows,
    meta: {
      page,
      limit,
      total: countRows[0].total,
      totalPages: Math.max(Math.ceil(countRows[0].total / limit), 1),
    },
  }
}

export async function findAlbumById(id) {
  const [rows] = await pool.execute(
    `SELECT id, title, artist, genre, release_year AS releaseYear, label, cover_url AS coverUrl,
      tracks_count AS tracksCount, created_at AS createdAt
     FROM albums
     WHERE id = ?`,
    [id],
  )

  return rows[0] || null
}

export async function createAlbum(payload) {
  const [result] = await pool.execute(
    `INSERT INTO albums
      (title, artist, genre, release_year, label, cover_url, tracks_count)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    mapAlbumPayload(payload),
  )

  return findAlbumById(result.insertId)
}

export async function updateAlbum(id, payload) {
  const [result] = await pool.execute(
    `UPDATE albums
     SET title = ?, artist = ?, genre = ?, release_year = ?, label = ?, cover_url = ?, tracks_count = ?
     WHERE id = ?`,
    [...mapAlbumPayload(payload), id],
  )

  if (!result.affectedRows) {
    return null
  }

  return findAlbumById(id)
}

export async function deleteAlbum(id) {
  const [result] = await pool.execute('DELETE FROM albums WHERE id = ?', [id])

  return result.affectedRows > 0
}
