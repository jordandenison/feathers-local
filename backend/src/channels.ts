// For more information about this file see https://dove.feathersjs.com/guides/cli/channels.html
import type { Params } from '@feathersjs/feathers'
import '@feathersjs/transport-commons'
import type { Application, HookContext } from './declarations'

export const channels = (app: Application) => {
  app.on('login', (_, { connection }: Params) => {
    console.log('connection', connection)
    if (connection?.user?.internal) {
      console.log('joining service channel')
      app.channel('service').join(connection)
    }
  })

  // eslint-disable-next-line no-unused-vars
  app.publish((data: any, context: HookContext) => {
    return app.channel('service')
  })
}
