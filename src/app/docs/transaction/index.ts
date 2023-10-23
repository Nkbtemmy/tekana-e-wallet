import responses from '../responses'

const transaction = {
  '/transactions': {
    get: {
      tags: ['transaction'],
      summary: 'get all your transactions',
      security: [{
        JWT: []
      }],
      parameters: [
      ],
      consumes: [
        'application/json'
      ],
      produces: [
        'application/json'
      ],
      responses,
    },
  },
  '/transactions/deposit': {
    post: {
      tags: ['transaction'],
      summary: 'make deposite',
      security: [{
        JWT: []
      }],
      parameters: [
        {
          in: 'body',
          name: 'body',
          schema: {
            example:{
              accountId:"",
              amount:"",
            }
          }
        }
      ],
      consumes: [
        'application/json'
      ],
      produces: [
        'application/json'
      ],
      responses,
    },
    get: {
      tags: ['transaction'],
      summary: 'get all your deposit transactions',
      security: [{
        JWT: []
      }],
      parameters: [
      ],
      consumes: [
        'application/json'
      ],
      produces: [
        'application/json'
      ],
      responses,
    },
  },
  '/transactions/withdrawal': {
    post: {
      tags: ['transaction'],
      summary: 'make withdrawal',
      security: [{
        JWT: []
      }],
      parameters: [
        {
          in: 'body',
          name: 'body',
          schema: {
            example:{
              accountId:"",
              amount:"",
            }
          }
        }
      ],
      consumes: [
        'application/json'
      ],
      produces: [
        'application/json'
      ],
      responses,
    },
    get: {
      tags: ['transaction'],
      summary: 'get all your withdrawal transactions',
      security: [{
        JWT: []
      }],
      parameters: [
      ],
      consumes: [
        'application/json'
      ],
      produces: [
        'application/json'
      ],
      responses,
    },
  },
  '/transactions/transfer': {
    post: {
      tags: ['transaction'],
      summary: 'make transfer',
      security: [{
        JWT: []
      }],
      parameters: [
        {
          in: 'body',
          name: 'body',
          schema: {
            example:{
              accountId:"",
              amount:"",
              toAccountId:""
            }
          }
        }
      ],
      consumes: [
        'application/json'
      ],
      produces: [
        'application/json'
      ],
      responses,
    },
    get: {
      tags: ['transaction'],
      summary: 'get all your transfer transactions',
      security: [{
        JWT: []
      }],
      parameters: [
      ],
      consumes: [
        'application/json'
      ],
      produces: [
        'application/json'
      ],
      responses,
    },
  },
}

export default transaction;
