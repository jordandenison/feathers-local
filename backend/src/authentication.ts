// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import type { Params, Query } from '@feathersjs/feathers'
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
import type { AuthenticationStrategy } from '@feathersjs/authentication'
import { NotAuthenticated } from '@feathersjs/errors'

import type { Application } from './declarations'

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService
  }
}

class CustomJWTStrategy extends JWTStrategy {
  override getEntity(id: string, params: Params) {
    if (!id) {
      return Promise.resolve({ internal: true })
    }
    return super.getEntity(id, { ...params, internal: true } as Params<Query>)
  }
}

class ServiceAuthStrategy implements AuthenticationStrategy {
  constructor(public app: Application) {}

  async authenticate({ token }: { token: string }) {
    if (token === this.app.get('serviceToken')) {
      return { internal: true }
    } else {
      throw new NotAuthenticated('Invalid service token')
    }
  }
}

export const authentication = (app: Application) => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new CustomJWTStrategy())
  authentication.register('service', new ServiceAuthStrategy(app))

  app.use('authentication', authentication)
}
