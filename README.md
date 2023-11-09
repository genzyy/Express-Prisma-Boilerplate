<div>
    <h1>Typescript Rest API Boilerplate</h1>
</div>

An opinionated Typescript Express + Prisma boilerplate that is production ready.
Highly inspired by existing templates, but with significant changes to directory structure, ORM queries, and types.

## Table of Contents

- [Overview](#overview)
- [Stack](#stack)
- [Features](#features)
- [Guide](#guide)
- [Usage](#usage)
- [Acknowledgement](#acknowledgement)

## Overview

The template aims to be production ready with strict schemas & types, security middlewares, and having controllers and repositories as separate layers achieving a layered architecture.

## Stack

| Package           | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| Typescript        | Adds static type safety, classes, better error handling                   |
| Express           | Popular JS backend framework                                              |
| Prisma            | Typescript ORM with automated migrations, type-safety and auto-completion |
| Joi               | Schema language and data validator                                        |
| Winston           | Error logging                                                             |
| Morgan            | HTTP Request logger                                                       |
| ESLint & Prettier | Enforce code style and formatting                                         |
| Redis             | Redis backend for caching                                                 |
| Sentry            | Monitoring                                                                |

## Features

- Postgresql 16 support
- Basic Authentication using JWT ready
- Strict type safety
- Predictable directory structure
- Scalable architecture
- Multiple environment setup
- Concise logs and errors
- Caching

## Guide

Setting up the template is easy and takes minimum time to run (excluding the time it takes to install packages 😉)

1. Setup `nvm` for managing node versions and use `node v18.14.0`+ version.

2. Clone the repository and install node packages

```
git clone <github-link>
yarn install or npm install or make dependencies
```

3. Run infra setup

```
make infra-up
```

4. To run dev environment, do

```
make run or yarn dev or npm run dev
```

5. To check linting, do

```
make check-format
```

## Usage

### Database setup

Configure database properties in `prisma/schema.prisma`. To add/change tables, modify current tables or add new ones then do `make db-push` to see your new changes being reflected on local db.
Refer [prisma documentation](https://www.prisma.io/docs/concepts/components/prisma-schema) for prisma API and db types.

### Routes

To support API versioning, the template has a separate version subroute as `/v1`. Within this directory, you can find `auth`, `user` and `note` routes. Add a new route by creating a file `<collection>.route.ts`.

When done with adding a new collection, import `route` in `src/routes/v1/index.ts` with desired path.

### Controller and Validation

The template has one controller file which contains all methods. A better way could be here is to have a directory as `src/controllers/auth` and have separate file for each method. However, my personal opinion is having a single controller file is better when there are not too many methods for a collection and thats what I've followed in the project.

For validating correct data in the request body, a directory with `validations` exists that uses `Joi` for creating objects which sort of acts as schemas. Both request `body` and `headers` can be configured for getting required data and throwing an error on incorrect data.
Alternatively, you can use [zod](https://zod.dev/) or do checks within controller methods.

### Middlewares

Currently the project has two middlewares, `auth` and `validate`. `auth` checks for correct row-level permissions while `validate` checks for required data for the request.

`error` also acts as a middlware since it handles how errors are displayed in console. It also controls displaying of DB errors from prisma.

### Config/env

Check `src/core/config.ts` for the environment variables. Alternatively, you can use `process.env` to get required env vars. The advantage of having a config file in a project is it provides type safety and errors if required variables are not available.

It sort of creates a schema which can be used in different files, with static types and also looks clean.

### Logging

[morgan](https://github.com/expressjs/morgan) and [winston](https://www.npmjs.com/package/winston) are being used for logging endpoint calls, errors. Winston is mostly setup for formatting how the error should be logged and with what log level. While morgan is used to get request and error details and for `production` env, morgan provides logging with remote IP address details.

For SQL queries, a basic middleware setup is present in `src/core/prisma/client.ts`.

### Monitoring

The project contains a basic [Sentry](https://sentry.io/welcome/) setup for monitoring. You can add new integrations and change config based on your requirements.

### Repositories (CRUD actions) and Types

`src/repositories` contains all methods which carry out CRUD operations on db level.
The methods are only meant to carry out the actions and nothing more than that. Error handling and formatting returned data should be done at controller level.

Fetching data from prisma and selecting keys is a bit different than how traditional ORMs work. In prisma, we need to specify which columns are required when fetching data from db. This is where `src/types` directory comes into work, it provides with correct key lists and types that you may require when querying data. You can create different types and lists using `include` util and when needed to require certain columns from the query result, you can use `exclude` util to remove those keys.

## Acknowledgement

- This template is inspired from the project: [prisma-express-typescript-boilerplate](https://github.com/antonio-lazaro/prisma-express-typescript-boilerplate)
- Directory structure and naming comes from a bunch of FastAPI projects.
