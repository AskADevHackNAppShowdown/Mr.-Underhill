import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav'
import MovieFinder from './components/MovieFinder';

function App() {
  
  return (
    <div>
      <Nav></Nav>
      <MovieFinder />
    </div>
  )
}

export default App;
