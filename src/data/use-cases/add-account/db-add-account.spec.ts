import { AddAccountModel } from '../../../domain/use-cases/add-account'
import { DBAddAccount } from './db-add-account'

describe('DBAddAccount use cases', () => {
  it('should call encrypter with correct password', async () => {
    class EncrypterStub {
      encrypt (_password: string): Promise<string> {
        return Promise.resolve('hashed_password')
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DBAddAccount(encrypterStub)
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    const account: AddAccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(account)
    expect(encrypterSpy).toHaveBeenCalledWith('valid_password')
  })
})
