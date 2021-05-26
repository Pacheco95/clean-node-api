import { AccountModel, AddAccount, AddAccountModel, Encrypter } from './db-add-account-protocols'

export class DBAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter
  ) {
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    // @ts-expect-error
    return Promise.resolve(null)
  }
}
