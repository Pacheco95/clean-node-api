import { HttpResponse } from '../protocols'
import { InternalServerError } from '../errors'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const internalServerError = (): HttpResponse => ({
  statusCode: 500,
  body: new InternalServerError()
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
