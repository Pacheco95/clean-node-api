import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Encrypter } from './db-add-account-protocols'

export class DBAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository) {
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    const newAccount = await this.addAccountRepository.add({
      ...account,
      password: hashedPassword
    })
    return Promise.resolve(newAccount)
  }
}
