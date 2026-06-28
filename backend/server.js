import 'dotenv/config'
import express from 'express'
import { swaggerSpec, swaggerUi } from './src/swagger.js'
import sequelize from './src/database/connection.js'
import './src/models/index.js'
import authRoutes from './src/routes/AuthRoutes.js'
import alunoRoutes from './src/routes/alunoRoutes.js'
import personalRoutes from './src/routes/personalRoutes.js'
import treinoRoutes from './src/routes/treinoRoutes.js'
import exercicioRoutes from './src/routes/exercicioRoutes.js'
import treinoExercicioRoutes from './src/routes/treinoExercicioRoutes.js'
import historicoRoutes from './src/routes/historicoRoutes.js'
import progressoRoutes from './src/routes/progressoRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ message: 'GymFlow API rodando!' })
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/', authRoutes)
app.use('/alunos', alunoRoutes)
app.use('/personais', personalRoutes)
app.use('/treinos', treinoRoutes)
app.use('/exercicios', exercicioRoutes)
app.use('/treinos/:treino_id/exercicios', treinoExercicioRoutes)
app.use('/historico', historicoRoutes)
app.use('/progresso', progressoRoutes)

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed' || err instanceof SyntaxError) {
    return res.status(400).json({ erro: 'JSON inválido no corpo da requisição' })
  }
  const status = err.status || err.statusCode || 500
  res.status(status).json({ erro: err.message || 'Erro interno do servidor' })
})

sequelize.authenticate()
  .then(() => {
    console.log('Banco de dados conectado!')
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`)
      console.log(`Swagger disponível em http://localhost/api-docs/`)
    })
  })
  .catch((err) => {
    console.error('Erro ao conectar no banco:', err)
  })

export default app
