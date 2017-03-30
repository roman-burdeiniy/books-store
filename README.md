## Synopsis
The Bookstore application is self-sufficient web resource
 that is designed to work as online shop over internet

## Motivation

Allows books stores to move their business to digital

## Setup requirements

mongodb v3.4.0 or higher
node v6.10.0 or higher

## Installation

git clone ...

cd ./books-store

`npm install`

go to books-store/src/shop-frontend

`npm install`

For development purpose:

1. Generate test db data:
    From the project root:
        `npm run populate-dev-db`

##Build
`npm run build-api`
`npm run build-shop`

##Run
`npm run start-api`
`npm run start-shop`
The api server is stated on 3000 port by default.
The application server is started on 3001 port by default.
Locally site is accessible on http://localhost:3001

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

Describe and show how to run the tests with code examples.

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License
