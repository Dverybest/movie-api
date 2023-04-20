## Description

Movie Ticket Booking API 

## Technology
- NestJS
- MySQL
- TypeORM

## Installation

```bash
$ yarn install
```

## Enviroment variables

```bash
$ touch .env
```
copy the keys in .env-example file locatated in the root directory into the .env created above and fill in the values

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Avaliable Endpoints

- /movies : get list of movies

- /movies/{id} : get movie by id

- /movies/book-movie-ticket : book movie ticket
