# CineList

Demo: https://edukegler.github.io/cinelist

# What is this?

This is simple SPA to see a list of all the movies and bookmark or add to a list to watch later.
It was created using the React / Typescript stack, with SCSS preprocessor.
Testing was developed using the Jest and React Testing Library.

The SPA consumes the https://www.themoviedb.org/ API and saves the bookmark and Watch Later List in LocalStorage, 
so that each user can have their own list without the need to create a new token.

# How to run?

Just follow the steps:
Clone this project and run `npm install`.

You will need a token to consume the API, you can get it here https://www.themoviedb.org/settings/api. 
Then create an .env file at the root with the TOKEN and the API URL. e.g.

```
REACT_APP_TOKEN=<your token>
REACT_APP_URL=https://api.themoviedb.org/3/
```

After that will can run `npm run start` and see the project in `localhost:3000`.

# How to test?

You can run `npm run test` to see the results of the tests.
