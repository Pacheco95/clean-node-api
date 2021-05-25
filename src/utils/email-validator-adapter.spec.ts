import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail () {
    return true
  }
}))

describe('EmailValidator adapter', () => {
  it('should return false if validator returns false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  it('should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })
})
