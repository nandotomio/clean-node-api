import { makeSurveyController, makeLoadSurveysController } from '@/main/factories'
import { adminAuth, auth } from '@/main/middlewares'
import { adaptRoute } from '@/main/adapters'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
