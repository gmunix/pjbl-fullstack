import { body, param } from 'express-validator'

export const albumIdValidation = [
  param('id').isInt({ min: 1 }).withMessage('O ID do álbum deve ser um número positivo.'),
]

export const albumValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('O título é obrigatório.')
    .isLength({ max: 150 })
    .withMessage('O título pode ter no máximo 150 caracteres.'),
  body('artist')
    .trim()
    .notEmpty()
    .withMessage('O artista é obrigatório.')
    .isLength({ max: 150 })
    .withMessage('O artista pode ter no máximo 150 caracteres.'),
  body('genre')
    .trim()
    .notEmpty()
    .withMessage('O gênero é obrigatório.')
    .isLength({ max: 80 })
    .withMessage('O gênero pode ter no máximo 80 caracteres.'),
  body('releaseYear')
    .isInt({ min: 1900, max: 2100 })
    .withMessage('O ano de lançamento deve estar entre 1900 e 2100.'),
  body('label')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 120 })
    .withMessage('A gravadora pode ter no máximo 120 caracteres.'),
  body('coverUrl')
    .optional({ values: 'falsy' })
    .trim()
    .isURL()
    .withMessage('A URL da capa deve ser um link válido.'),
  body('tracksCount')
    .isInt({ min: 1, max: 99 })
    .withMessage('A quantidade de faixas deve estar entre 1 e 99.'),
]
