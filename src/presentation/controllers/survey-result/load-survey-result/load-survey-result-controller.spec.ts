import { LoadSurveyResultController } from './load-survey-result-controller'
import { HttpRequest } from './load-survey-result-controller-protocols'
import { mockLoadSurveyById } from '@/presentation/test'

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id'
  }
})

describe('LoadSurveyResult Controller', () => {
  test('should call LoadSurveyById with correct value', async () => {
    const loadSurveyByIdStub = mockLoadSurveyById()
    const sut = new LoadSurveyResultController(loadSurveyByIdStub)
    const loadById = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadById).toHaveBeenCalledWith('any_id')
  })
})
