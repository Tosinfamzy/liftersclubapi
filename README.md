# Lifters Club Exercise REST API

Built with NestJS, this project serves as a comprehensive exercise rolodex.

## Table of Contents

- [Project Setup](#project-setup)
- [Compile and Run the Project](#compile-and-run-the-project)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Testing](#testing)

## Project Setup

To set up the project, clone the repository and install the dependencies:

```bash
$ git clone <repository-url>
$ cd lifters-club
$ npm install
```

## Compile and Run the Project

Before running the project, ensure you have filled out the `.env` and `docker-compose.yml` files.

## Using Docker

To start the project with Docker:

```bash
$ docker-compose up
```

## Without Docker

To start the project in different modes:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

The API documentation is generated using Swagger. Once the application is running, you can access the API documentation at:

```
http://localhost:3000/api

```

## Environment Variables

The project uses environment variables to manage configuration. Create a `.env`file in the root directory and fill it with the necessary variables. Refer to `.env.example` for an example.

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

End-to-end tests are located in the test/ directory.
