import { EmailValidation } from '@/validation/validators'
import { EmailValidatorSpy } from '@/tests/validation/mocks'
import { InvalidParamError } from '@/presentation/errors'
import faker from 'faker'
import { throwError } from '@/tests/domain/mocks'

const field = faker.random.word()

type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(field, emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

describe('SignUp Controller', () => {
  test('should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const email = faker.internet.email()
    const error = sut.validate({ [field]: email })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    const email = faker.internet.email()
    sut.validate({ [field]: email })
    expect(emailValidatorSpy.email).toBe(email)
  })

  test('should throw if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })
})
