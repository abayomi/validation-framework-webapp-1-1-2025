"use client";
import styles from "./page.module.css";
import About from  "./components/about/about";
import Counter from "./components/counter/Counter";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import TabMenu from "./components/createobject/tabMenu";
import ViewTabMenu from "./components/homepage/tabMenu";
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
  useEffect(() => {    
    setIsBrowser(typeof window !== "undefined");
  }, [isBrowser]);

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
                <Route path="updatemasterobject/object" element={ <TabMenu /> } /> 
                <Route path="updatemasterobject/field" element={ <TabMenu /> } />  
              </Routes>
            </div>

            <footer className="container bg-light py-4 text-muted mb-0 text-center">Validation Framework</footer>
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
