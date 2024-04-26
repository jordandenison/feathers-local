# feathers-local

>

## About

This project uses [Feathers](http://feathersjs.com). An open source framework for building APIs and real-time applications.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Run with docker compose

   ```
   cd path/to/feathers-local
   docker compose up
   ```

3. Migrate the database

   ```
   docker exec feathers-local-backend-1 npm run migrate
   ```

## Testing

Run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

This app comes with a powerful command line interface for Feathers. Here are a few things it can do:

```
$ npx feathers help                           # Show all commands
$ npx feathers generate service               # Generate a new Service
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
