import { app } from './app'
import { logger } from './logger'
import auth from '@feathersjs/authentication-client'
import socketio from '@feathersjs/socketio-client'
// @ts-ignore
import { io } from 'socket.io-client'

import { type User, createClient } from './client'

const port = app.get('port')
const host = app.get('host')

process.on('unhandledRejection', (reason) => logger.error('Unhandled Rejection %O', reason))

const initBackend = app.get('init').backend
const initService = app.get('init').service
const canReceiveRealtimeEvents = true

const init = async () => {
  await app.listen(port)

  logger.info(`${initBackend ? 'backend' : 'service'} listening on http://${host}:${port}`)

  if (initBackend) {
    const createUser = async () => {
      console.log('creating user')
      const createdUser = await app.service('users').create({})
      console.log('createdUser ', createdUser)
      setTimeout(createUser, 10000)
    }

    createUser()
  }

  if (initService) {
    const socket = io('http://backend:3030', {
      transports: ['websocket']
    })
    const connection = socketio(socket)
    const client = createClient(connection)
    client.configure(auth())

    const serviceResponse = await client.authenticate({
      strategy: 'service',
      token: app.get('serviceToken')
    })
    console.log('serviceResponse', serviceResponse)

    if (canReceiveRealtimeEvents) {
      const jwtResponse = await client.authenticate({
        strategy: 'jwt',
        accessToken: serviceResponse.accessToken
      })
      console.log('jwtResponse', jwtResponse)
    }

    client.service('users').on('created', (user: User) => {
      console.log('User created event ', user)
    })
  }
}

init()
