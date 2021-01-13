import { DbLoadSurveyResult } from './db-load-survey-result'
import { SurveyResultModel } from '../save-survey-result/db-save-survey-result-protocols'
import { mockSurveyResultModel } from '@/domain/test'
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'

describe('DbLoadSurveyResult UseCase', () => {
  test('should call LoadSurveyResultRepository with correct values', async () => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
      async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
        return Promise.resolve(mockSurveyResultModel())
      }
    }
    const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
    await sut.load('any_survey_id')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
