import { AddAccountModel } from '../../domain/use-cases/add-account'
import { AccountModel } from '../../domain/models/account-model'

export interface AddAccountRepository {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
