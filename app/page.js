"use client";
import styles from "./page.module.css";
import About from  "./components/about/about";
import Counter from "./components/counter/Counter";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import TabMenu from "./components/createobject/tabMenu";
import ViewTabMenu from "./components/homepage/homepageTabMenu";
import ValidateRecords from "./components/validateRecords/validateRecords"
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./App.scss";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, newworkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map((message, location, path) => {
      alert(`Graphql error ${message}`);
    });
  }
});
const link = from([
  errorLink,
  new HttpLink({
    uri: 'https://4wx5b547dnen5gb5mce4tzfq3q.appsync-api.us-east-1.amazonaws.com/graphql?x-api-key=da2-67o2rwbpvjazhfprabeu7bshji',
    headers: {
      'x-api-key': 'da2-67o2rwbpvjazhfprabeu7bshji'
    }
  })
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

export default function Home() {
  const [isBrowser, setIsBrowser] = useState(false);

  // Do not put window object in the dependencies array. This means that every time window changes, useEffect will re-run. However, the window object is a 
  // global object in the browser environment and it does not change, so putting it in the dependencies array does not make sense and may cause unnecessary warnings or errors.
  useEffect(() => {    
    setIsBrowser(typeof window !== "undefined");
  }, []);

  const browserRouter = (
    <BrowserRouter>
        <Provider store={store} >
          <div className="App">
            <Navbar />
            <div className="container mt-2" style={{ marginTop: "40px" }}>
              <Routes>
                <Route path="/" element={ <ViewTabMenu /> } />
                <Route path="about" element={ <About /> } />          
                <Route path="counter" element={ <Counter /> } />
                <Route path="profile/:name" element={ <Profile /> }/>              
                <Route path="createmasterobject" element={ <TabMenu /> } />        
                <Route path="updatemasterobject/object/:id" element={ <TabMenu /> } />
                <Route path="updatemasterobject/field" element={ <TabMenu /> } />
                <Route path="validateRecords" element={ <ValidateRecords />} />
              </Routes>
            </div>

            <footer className="container bg-light py-4 text-muted mt-3 mb-0 text-center">Validation Framework</footer>
          </div>
        </Provider>
    </BrowserRouter>
  );

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <ApolloProvider client={client}>
          {isBrowser ? browserRouter : null}
        </ApolloProvider>
      </div>
    </main>
  );
}
