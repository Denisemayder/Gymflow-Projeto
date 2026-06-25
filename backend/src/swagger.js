import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
// Este arquivo está em backend/src/swagger.js
// As rotas estão em backend/src/routes/*.js
const __dirname = dirname(__filename)

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GymFlow API',
      version: '1.0.0',
      description: 'API de gerenciamento de treinos para academias',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT obtido no login'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: [join(__dirname, 'routes/*.js')],
}

const swaggerSpec = swaggerJsdoc(options)

export { swaggerSpec, swaggerUi }
