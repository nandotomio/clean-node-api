import { Hasher, AddAccountRepository, LoadAccountByEmailRepository } from '@/data/protocols'
import { AddAccount } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (data: AddAccount.Params): Promise<AddAccount.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(data.email)
    let newAccount: AccountModel = null
    if (!account) {
      const hashedPassword = await this.hasher.hash(data.password)
      newAccount = await this.addAccountRepository.add({
        ...data,
        password: hashedPassword
      })
    }

    return newAccount !== null
  }
}
