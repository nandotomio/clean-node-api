import app from '../config/app'
import { noCache } from './no-cache'
import request from 'supertest'

describe('NoCache Middleware', () => {
  test('should enable no cache', async () => {
    app.get('/test_no_cache', noCache, (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
