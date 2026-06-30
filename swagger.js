const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'A simple Todo CRUD API built with Express.js and Supabase',
    },
    servers: [
      {
        url: process.env.BASE_URL,
        description: 'Local server',
      },
    ],
    components: {
      schemas: {
        Todo: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Buy groceries' },
            description: { type: 'string', example: 'Milk, eggs, bread' },
            is_completed: { type: 'boolean', example: false },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        TodoInput: {
          type: 'object',
          required: ['title'],
          properties: {
            title: { type: 'string', example: 'Buy groceries' },
            description: { type: 'string', example: 'Milk, eggs, bread' },
            is_completed: { type: 'boolean', example: false },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
