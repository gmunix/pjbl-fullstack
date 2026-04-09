import { validationResult } from 'express-validator'

export default function validateRequest(req, res, next) {
  const result = validationResult(req)

  if (result.isEmpty()) {
    return next()
  }

  const errors = result.array({ onlyFirstError: true }).map((error) => ({
    field: error.path,
    message: error.msg,
  }))

  return res.status(400).json({
    message: 'Falha na validação.',
    errors,
  })
}
