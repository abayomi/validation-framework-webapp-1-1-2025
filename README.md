Webapp used to interact with the query and mutation portion of the validation framework. The app makes heavy use of the AppSync GraphQL APIs for the validation framework.

## How to run locally

1. Run `npm i` 
2. Run `npm run dev`
3. Go to `http://localhost:3000/`


## Unit test

### Run all test

Run `npm test`

### Run a single file

Run `npm test -- viewObjectMaster.test.js`

## Unit testing related references

* [Common Test Scenarios with React Testing Library](https://react-testing-library-examples.netlify.app/)
* [Firing Events](https://testing-library.com/docs/dom-testing-library/api-events/)
* [Best Practices for Writing Tests with React Testing Library](https://claritydev.net/blog/improving-react-testing-library-tests#google_vignette)

## GraphQL references

* Pagination https://graphql.org/learn/pagination/
* How to use Apollo useQuery with multiple queries https://atomizedobjects.com/blog/react/how-to-use-apollo-usequery-multiple-queries/
* https://www.apollographql.com/tutorials/lift-off-part1/10-the-usequery-hook
* useLazyQuery of Apollo GraphQL Client https://www.apollographql.com/docs/react/v2/api/react-hooks#uselazyquery