import { Router } from 'express'

import {
  getAlbumById,
  getAlbums,
  postAlbum,
  putAlbum,
  removeAlbum,
} from '../controllers/albumsController.js'
import validateRequest from '../middlewares/validateRequest.js'
import { albumIdValidation, albumValidation } from '../validations/albumsValidation.js'

const router = Router()

router.get('/', getAlbums)
router.get('/:id', albumIdValidation, validateRequest, getAlbumById)
router.post('/', albumValidation, validateRequest, postAlbum)
router.put('/:id', [...albumIdValidation, ...albumValidation], validateRequest, putAlbum)
router.delete('/:id', albumIdValidation, validateRequest, removeAlbum)

export default router
