import { LoadAccountByEmailRepository, HashComparer, Encrypter, UpdateAccessTokenRepository } from '@/data/protocols'
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { AuthenticationModel } from '@/domain/models'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationModel> {
    const { email, password } = authenticationParams

    const account = await this.loadAccountByEmailRepository.loadByEmail(email)

    if (account) {
      const isValid = await this.hashComparer.compare(password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return {
          accessToken,
          name: account.name
        }
      }
    }

    return null
  }
}
