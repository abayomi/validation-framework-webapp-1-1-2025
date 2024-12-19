Webapp used to interact with the query and mutation portion of the validation framework. The app makes heavy use of the AppSync GraphQL APIs for the validation framework.

## How to run locally

1. Run `npm i` 
2. Run `npm run dev`
3. Go to `http://localhost:3000/`

## How to build

Run `npm run build`

Notice: On Element's computer, this command might fail because the 'dist' directory already exists and is not empty. Additionally, you might encounter issues deleting the directory due to insufficient permissions.

## Unit test

### Run all test

Run `npm test`

### Run a single file

Run `npm test -- viewObjectMaster.test.js`

## Unit testing related references

* [Common Test Scenarios with React Testing Library](https://react-testing-library-examples.netlify.app/)
* [Firing Events](https://testing-library.com/docs/dom-testing-library/api-events/)
* [Best Practices for Writing Tests with React Testing Library](https://claritydev.net/blog/improving-react-testing-library-tests#google_vignette)
* [How to ignore lines in Jest](https://github.com/istanbuljs/nyc?tab=readme-ov-file#parsing-hints-ignoring-lines)

## GraphQL references

* Pagination https://graphql.org/learn/pagination/
* How to use Apollo useQuery with multiple queries https://atomizedobjects.com/blog/react/how-to-use-apollo-usequery-multiple-queries/
* https://www.apollographql.com/tutorials/lift-off-part1/10-the-usequery-hook
* useLazyQuery of Apollo GraphQL Client https://www.apollographql.com/docs/react/v2/api/react-hooks#uselazyquery