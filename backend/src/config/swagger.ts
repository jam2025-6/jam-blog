import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jam Blog API',
      version: '1.0.0',
      description: 'A backend API for Jam Blog application',
      contact: {
        name: 'Developer',
        email: 'developer@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development Server'
      }
    ],
    components: {
      schemas: {
        Article: {
          type: 'object',
          required: ['title', 'date', 'content'],
          properties: {
            id: {
              type: 'integer',
              description: 'Article ID',
              example: 1
            },
            title: {
              type: 'string',
              description: 'Article title',
              example: 'First Blog Post'
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Article publish date',
              example: '2025-12-01T14:30:00.000Z'
            },
            content: {
              type: 'string',
              description: 'Article content',
              example: 'This is the content of the first blog post.'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Record creation time',
              example: '2025-12-01T14:30:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Record update time',
              example: '2025-12-01T14:30:00.000Z'
            }
          }
        },
        Memory: {
          type: 'object',
          required: ['title', 'date'],
          properties: {
            id: {
              type: 'integer',
              description: 'Memory ID',
              example: 1
            },
            title: {
              type: 'string',
              description: 'Memory title',
              example: 'Summer Vacation'
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Memory date',
              example: '2025-08-15T10:00:00.000Z'
            },
            location: {
              type: 'string',
              description: 'Memory location',
              example: 'Beach'
            },
            description: {
              type: 'string',
              description: 'Memory description',
              example: 'A wonderful day at the beach with friends.'
            },
            images: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/MemoryImage'
              },
              description: 'Memory images'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Record creation time',
              example: '2025-12-01T14:30:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Record update time',
              example: '2025-12-01T14:30:00.000Z'
            }
          }
        },
        MemoryImage: {
          type: 'object',
          required: ['url', 'memoryId'],
          properties: {
            id: {
              type: 'integer',
              description: 'Image ID',
              example: 1
            },
            url: {
              type: 'string',
              description: 'Image URL',
              example: 'https://example.com/image.jpg'
            },
            memoryId: {
              type: 'integer',
              description: 'Associated memory ID',
              example: 1
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Record creation time',
              example: '2025-12-01T14:30:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Record update time',
              example: '2025-12-01T14:30:00.000Z'
            }
          }
        },
        SelfTalking: {
          type: 'object',
          required: ['time', 'content'],
          properties: {
            id: {
              type: 'integer',
              description: 'Self-talking ID',
              example: 1
            },
            time: {
              type: 'string',
              format: 'date-time',
              description: 'Self-talking time',
              example: '2025-12-01T14:30:00.000Z'
            },
            content: {
              type: 'string',
              description: 'Self-talking content',
              example: 'Today is a good day!'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Record creation time',
              example: '2025-12-01T14:30:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Record update time',
              example: '2025-12-01T14:30:00.000Z'
            }
          }
        },
        Message: {
          type: 'object',
          required: ['name', 'content', 'ip', 'userAgent', 'status'],
          properties: {
            id: {
              type: 'integer',
              description: 'Message ID',
              example: 1
            },
            name: {
              type: 'string',
              description: 'Message author name',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Message author email',
              example: 'john@example.com'
            },
            content: {
              type: 'string',
              description: 'Message content',
              example: 'This is a great blog!'
            },
            ip: {
              type: 'string',
              description: 'Message author IP address',
              example: '192.168.1.1'
            },
            userAgent: {
              type: 'string',
              description: 'Message author browser information',
              example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            status: {
              type: 'string',
              enum: ['pending', 'approved', 'rejected'],
              description: 'Message status',
              example: 'approved'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Record creation time',
              example: '2025-12-01T14:30:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Record update time',
              example: '2025-12-01T14:30:00.000Z'
            }
          }
        },
        MessageCreate: {
          type: 'object',
          required: ['name', 'content'],
          properties: {
            name: {
              type: 'string',
              description: 'Message author name',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Message author email',
              example: 'john@example.com'
            },
            content: {
              type: 'string',
              description: 'Message content',
              example: 'This is a great blog!'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;