import { DbLoadSurveys } from '@/data/usecases'
import { LoadSurveysRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositorySpy: LoadSurveysRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositorySpy = new LoadSurveysRepositorySpy()
  const sut = new DbLoadSurveys(loadSurveysRepositorySpy)
  return {
    sut,
    loadSurveysRepositorySpy
  }
}

describe('DbLoadSurveys UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    const accountId = faker.random.uuid()
    await sut.load(accountId)
    expect(loadSurveysRepositorySpy.accountId).toBe(accountId)
  })

  test('should return a list of surveys on success', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    const surveys = await sut.load(faker.random.uuid())
    expect(surveys).toEqual(loadSurveysRepositorySpy.surveyModels)
  })

  test('should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    jest.spyOn(loadSurveysRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load(faker.random.uuid())
    await expect(promise).rejects.toThrow()
  })
})
