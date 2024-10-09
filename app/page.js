"use client";
import styles from "./page.module.css";
import About from  "./components/about/about";
import Counter from "./components/counter/Counter";
import Navbar from './components/navbar/Navbar';
import Profile from "./components/profile/Profile";
import Homepage from "./components/homepage/Homepage";
import CreateMasterObject from "./components/createobject/createFieldMaster"
import TabMenu from "./components/createobject/tabMenu";
import ViewTabMenu from "./components/homepage/tabMenu";

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './App.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
      <BrowserRouter>
        <Provider store={store} >
          

          <div className="App">
          <Navbar />
          <div className="container mt-2" style={{ marginTop: 40 }}>
            <Routes>
              <Route path="/" element={ <ViewTabMenu/> } />
              <Route path="about" element={ <About/> } />          
              <Route path="counter" element={ <Counter/> } />
              <Route path="profile/:name" element={ <Profile/> }/>              
              <Route path="createmasterobject" element={ <TabMenu/> } />        
              <Route path="updatemasterobject/object" element={ <TabMenu/> } /> 
              <Route path="updatemasterobject/field" element={ <TabMenu/> } />  
            </Routes>
          </div>

          <footer class="bg-white">
            <div class="bg-light py-4">
              <div class="container text-center">
                <p class="text-muted mb-0 py-2">Validation Framework</p>
              </div>
            </div>
          </footer>
        </div>

        </Provider>
      </BrowserRouter>    

      </div>
    </main>
  );
}
