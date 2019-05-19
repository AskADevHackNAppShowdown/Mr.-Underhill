import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav'
import MovieFinder from './components/MovieFinder';

function App() {
  
  const [reviews, setReviews] = useState([])
  
  useEffect(()=> {
    fetch('http://localhost:1987/reviews')
    .then(response => response.json())
    .then(res => {
      console.log(res)
      setReviews(res)
    })
  }, [])

  return (
    <div>
      <Nav></Nav>
      <MovieFinder reviews={reviews} />
    </div>
  )
}

export default App;
