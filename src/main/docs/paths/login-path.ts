export const loginPath = {
  post: {
    tags: ['Login'],
    summary: 'User authentication',
    requestBody: {
      200: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/loginParams'
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account'
            }
          }
        }
      }
    }
  }
}
