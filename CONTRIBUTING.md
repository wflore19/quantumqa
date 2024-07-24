# Contributing

## Prerequisites

Download necessary tools, clone the repository, and install dependencies via
yarn, you need network access.

- [Git](https://git-scm.com/) version control.
- [Docker](https://www.docker.com/products/docker-desktop/) containerized apps.
  [here](./docker-compose.yml)
- [Nodejs](https://nodejs.org/en/) (v20.x) Javascript runtime.
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
  dependency manager.

## Fork and Clone Repository

1. Fork the QuantumQA repository to your own GitHub account.
2. Clone your fork locally.

```
git clone https://github.com/wflore19/quantumqa.git
```

3. Configure the upstream repository, which will help update your fork repo with
   the original repo when new code is added to it.

```
git remote add upstream https://github.com/wflore19/quantumqa.git
```

4. Create a new branch.

```
git checkout -b <YOUR_NAME>/<FEATURE_NAME> (eg. flo/review-feature)
```

Occasionally you will want to merge changes in the upstream repository (the
official code repo) with your fork.

```
cd quantumqa
git checkout master
git fetch upstream
```

## Setting up

1. Install all project dependencies.

```
yarn
```

2. Set up your environment variables.

```
yarn env:setup
```

You'll now have .env files in all of your apps and packages!

## Database

Running your Postgres and Redis database containers in the background via
[Docker](./docker-compose.yml)

```
yarn dx:up
```

Update/migrate database migrations.

```
yarn db:migrate
```

This command tells your database to make any changes that are needed to keep it
up-to-date.

Add/seed some data in your database.

```
yarn db:seed
```

Stopping the Postgres and Redis database containers

```
yarn dx:down
```

## Build and Run

If you want to understand how QuantumQA works or want to debug an issue, you'll
want to get the source, build it, and run the tool locally.

Install and build all of the dependencies using Yarn.

```
cd quantumqa
yarn
```

To build.

```
yarn build
```

To run a local developement version.

```
yarn dev
```

To run all of your applications.

```
yarn dev:apps
```

To run _one_ of your applications, use the `--filter` flag.

```
yarn dev --filter=admin-api
```

## Debugging

Using the Chrome Developer Tools.

## Testing

Still gotta integrate tests.

## Pull Requests

Some things to keep in mind when making a pull request:

- The target branch in our repository is main.
- Fill out the PR template accordingly.
- The name of the PR should:
  - Start with one of the following prefixes:
    - feat: A non-breaking change which adds functionality.
    - fix: A non-breaking change which fixes an issue.
    - refactor: A change that neither fixes a bug nor adds a feature.
    - docs: A change only to in-code or markdown documentation.
    - test: A change that adds missing tests.
    - chore: A change that is likely none of the above.
  - Be in all lowercase.
  - Start with a verb (ie: "add ...", "implement ...", "update ...").
  - Have an emoji at the end of it (we like color around here). 🔥
