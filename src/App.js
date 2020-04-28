import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';


import * as containers from './main/containers';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className='header'>
        My To-Do-List!!
      </h1>
      <BrowserRouter>
          <Route path='/' exact component={containers.Dashboard} />
          </BrowserRouter>
    </div>

  );
}

export default App;
