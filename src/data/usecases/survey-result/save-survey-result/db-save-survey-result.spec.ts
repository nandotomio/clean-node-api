import { DbSaveSurveyResult } from './db-save-survey-result'
import { SaveSurveyResultRepository, LoadSurveyResultRepository } from './db-save-survey-result-protocols'
import { throwError, mockSaveSurveyResultParams, mockSurveyResultModel } from '@/domain/test'
import { mockSaveSurveyResultRepository, mockLoadSurveyResultRepository } from '@/data/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub, loadSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const saveSurveyResultParams = mockSaveSurveyResultParams()
    await sut.save(saveSurveyResultParams)
    expect(saveSpy).toHaveBeenCalledWith(saveSurveyResultParams)
  })

  test('should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrow()
  })

  test('should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    const saveSurveyResultParams = mockSaveSurveyResultParams()
    await sut.save(saveSurveyResultParams)
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(saveSurveyResultParams.surveyId)
  })

  test('should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError)
    const promise = sut.save(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrow()
  })

  test('should return a survey result on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.save(mockSaveSurveyResultParams())
    expect(surveyResult).toEqual(mockSurveyResultModel())
  })
})
