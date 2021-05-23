import { SignupController } from './signup'

describe('SignUpController', () => {
  it('should return 400 if no name is provided', () => {
    const sut = new SignupController()
    const httpRequest = {
      email: 'any_email@gmail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
