import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
})

export async function fetchAlbums(params) {
  const response = await api.get('/albums', { params })
  return response.data
}

export async function fetchAlbum(id) {
  const response = await api.get(`/albums/${id}`)
  return response.data
}

export async function createAlbum(payload) {
  const response = await api.post('/albums', payload)
  return response.data
}

export async function updateAlbum(id, payload) {
  const response = await api.put(`/albums/${id}`, payload)
  return response.data
}

export async function deleteAlbum(id) {
  await api.delete(`/albums/${id}`)
}
