import { AddAccountModel } from '../../../domain/use-cases/add-account'
import { DBAddAccount } from './db-add-account'
import { Encrypter } from './db-add-account-protocols'

interface SutTypes {
  sut: DBAddAccount
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    encrypt (_password: string): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }
  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const sut = new DBAddAccount(encrypterStub)

  return {
    encrypterStub,
    sut
  }
}

describe('DBAddAccount use cases', () => {
  it('should call encrypter with correct password', async () => {
    const { encrypterStub, sut } = makeSut()
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    const account: AddAccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(account)
    expect(encrypterSpy).toHaveBeenCalledWith('valid_password')
  })

  it('should throw if encrypter throws', async () => {
    const { encrypterStub, sut } = makeSut()
    const error = new Error()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => {
      throw error
    })
    const account: AddAccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const accountPromise = sut.add(account)
    await expect(accountPromise).rejects.toBe(error)
  })
})
