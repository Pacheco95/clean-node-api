import { HttpResponse } from '../protocols/http'
import { InternalServerError } from '../errors'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const internalServerError = (): HttpResponse => ({
  statusCode: 500,
  body: new InternalServerError()
})
