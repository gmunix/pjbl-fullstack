export default function errorHandler(error, _req, res, _next) {
  console.error(error)

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({
      message: 'Payload JSON inválido.',
    })
  }

  res.status(500).json({
    message: 'Erro interno inesperado no servidor.',
  })
}
