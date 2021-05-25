import { AddAccount, AddAccountModel } from '../../../domain/use-cases/add-account'
import { AccountModel } from '../../../domain/models/account-model'
import { Encrypter } from '../../protocols/encrypter'

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
