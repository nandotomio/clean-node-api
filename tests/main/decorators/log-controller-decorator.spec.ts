import { LogControllerDecorator } from '@/main/decorators'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError, ok } from '@/presentation/helpers'
import { LogErrorRepositorySpy } from '@/tests/data/mocks'
import faker from 'faker'

class ControllerSpy implements Controller {
  httpResponse = ok(faker.random.objectElement())
  request: any

  async handle (request: any): Promise<HttpResponse> {
    this.request = request
    return Promise.resolve(this.httpResponse)
  }
}

const mockRequest = (): any => (faker.random.objectElement())

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogController Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(controllerSpy.request).toEqual(request)
  })

  test('should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  test('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const serverError = mockServerError()
    controllerSpy.httpResponse = serverError
    await sut.handle(mockRequest())
    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  })
})
