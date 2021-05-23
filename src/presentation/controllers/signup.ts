import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, internalServerError } from '../helpers/http-helpers'

export class SignupController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const requiredField of requiredFields) {
        if (!httpRequest.body[requiredField]) {
          return badRequest(new MissingParamError(requiredField))
        }
      }

      const { email, password, passwordConfirmation } = httpRequest.body

      const isValidEmail = this.emailValidator.isValid(email)

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      return {
        statusCode: 200,
        body: {}
      }
    } catch (e) {
      return internalServerError()
    }
  }
}
