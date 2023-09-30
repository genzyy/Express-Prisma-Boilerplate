<div>
    <h1>Typescript Rest API Boilerplate</h1>
</div>

An opinionated Typescript Express + Prisma boilerplate that is production ready.
Highly inspired by existing templates, but with significant changes to directory structure, ORM queries, and types.

## Table of Contents

- Overview
- Stack
- Features
- Guide
- Usage
- Acknowledgement

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

## Features

- Postgresql 16 support
- Basic Authentication using JWT ready
- Strict type safety
- Predictable directory structure
- Scalable architecture
- Multiple environment setup
- Concise logs and errors

## Guide

Setting up the template is easy and takes minimum time to run (excluding the time it takes to install packages 😉)

1. Setup `nvm` for managing node versions and use `node v18.14.0`+ version.

2. Clone the repository and install node packages

```
git clone <github-link>
yarn install or npm install
```

3. To run dev environment, do

```
yarn dev or npm run dev
```
