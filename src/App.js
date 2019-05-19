import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav'

function App() {
  const apiKey = "71ea7290"
  useEffect(() => {
    fetch('http://www.omdbapi.com/?s=waterboy&apikey=' + apiKey)
    .then(res => res.json())
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.error(err)
    })
  }, [])
  return (
    <div>
      <Nav></Nav>
      <div>Hello World</div>
    </div>
  )
}

export default App;
