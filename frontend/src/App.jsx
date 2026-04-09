import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AppShell from './components/AppShell'
import AlbumDetailsPage from './pages/AlbumDetailsPage'
import AlbumFormPage from './pages/AlbumFormPage'
import AlbumsListPage from './pages/AlbumsListPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<AlbumsListPage />} />
          <Route path="/albums/new" element={<AlbumFormPage />} />
          <Route path="/albums/:id" element={<AlbumDetailsPage />} />
          <Route path="/albums/:id/edit" element={<AlbumFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
