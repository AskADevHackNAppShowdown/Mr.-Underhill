import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { tsConstructorType } from '@babel/types';

const styles = {
    card: {
      maxWidth: 150,
    },
    media: {
      height: 300,
    },
  };

const MovieFinder = props => {
    const [thisAuthor, setThisAuthor] = useState('')
    const [thisRating, setThisRating] = useState('')
    const [thisReview, setThisReview] = useState('')
    const [showReviews, setShowReviews] = useState([])
    const [addReview, setAddReview] = useState(-1)
    const { classes, reviews } = props
    const sampleMovie = {
        Poster: "https://m.media-amazon.com/images/M/MV5BZGNhYTA1ODMtY2M5Yy00MTYwLWFlZmEtNDM4M2I4ZTI2ZmVmXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
        Rated: "PG",
        Ratings: [{Source: "Internet Movie Database", Value: "7.8/10"}, {Source: "Rotten Tomatoes", Value: "95%"}, {Source: "Metacritic", Value: "80/100"}],
        Title: "Food, Inc.",
        Year: "2008",
        imdbID: "tt1286537"
    }
    const [searchText, setSearchText] = useState('')
    const [movies, setMovies] = useState([])
    const apiKey = "aa1ce36898e53cf79394f7c59ef6ddbc"
    function handleSubmit(e) {
        e.preventDefault()
        const search = searchText
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&page=1`)
        .then(res => res.json())
        .then(response => {
            console.log(response.results)
            response.results.forEach(movie => {
                const tmdbId = movie.id.toString()
                let numReviews = 0
                let totalRating = 0
                let myReviews = []
                reviews.forEach(review => {
                    if(review.tmdbId == tmdbId) {
                        numReviews += 1
                        totalRating += review.rating
                        myReviews.push({message: review.message, rating:review.rating, author: review.author})
                    }
                const averageRating = numReviews ? totalRating/numReviews : 'N/A';
                movie.numReviews = numReviews
                movie.reviews= myReviews
                movie.averageRating = averageRating
                })
            })
            console.log(response.results)
            setMovies(response.results)
        })
      .catch(err => {
        console.error(err)
      })
        setSearchText('')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Movie Name</label>
                <input value={searchText} onChange={e=> setSearchText(e.target.value)} placeholder='Movie Name' />
                <button type="submit">Search</button>
            </form>
            <div className='movies'>
            {
                movies.slice(0,12).map((movie, index) => {
                    return (
                        <Card key={'movie' + index} className={classes.card}>
                            <CardMedia
                            className={classes.media}
                            image={"https://image.tmdb.org/t/p/w300" + movie.poster_path}
                            title="Movie Poster"
                            />
                            <CardContent>
                                <h2>{movie.title}</h2>
                                {showReviews.indexOf(index) !== -1 && 
                                movie.reviews.map(review => {
                                    return (
                                        <div>
                                            <p>{`Rating: ${review.rating}`}</p>
                                            <p>{`Author: ${review.author}`}</p>
                                            <p>{`Review: ${review.message}`}</p>
                                        </div>
                                    )
                                }
                                )
                                }
                                {addReview === index &&
                                <form onSubmit = {e => {
                                    e.preventDefault()
                                    setAddReview(-1)
                                    movie.numReviews +=1
                                    movie.reviews.push(
                                        {
                                            author: thisAuthor,
                                            rating: thisRating,
                                            message: thisReview
                                        }
                                    )
                                    fetch('http://localhost:1987/review', {
                                        method: 'POST', // or 'PUT'
                                        body: JSON.stringify({
                                            tmdbId: movie.id,
                                            author: thisAuthor,
                                            rating: thisRating,
                                            message: thisReview
                                        }), 
                                        headers:{
                                          'Content-Type': 'application/json'
                                        }
                                      }).then(res => res.json())
                                      .then(response => console.log('Success:', JSON.stringify(response)))
                                      .catch(error => console.error('Error:', error));
                                }}>
                                <div><label>Author: </label><input value={thisAuthor} onChange={e => setThisAuthor(e.target.value)}/></div>
                                <div><label>Rating: </label><input value={thisRating} onChange={e => setThisRating(e.target.value)} type="number" max="5" min="1"/></div>
                                <div><label>Review: </label><input value={thisReview} onChange={e => setThisReview(e.target.value)}/></div>
                                <button type="submit">Submit Review</button>
                                </form>}
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary"
                                onClick={e => {
                                    setAddReview(index)
                                }}>
                                Add Review
                                </Button>
                                {movie.numReviews && <Button size="small" color="primary" onClick={(e)=> {
                                    const reviewsToShow = showReviews.slice()
                                    reviewsToShow.push(index)
                                    setShowReviews(reviewsToShow)
                                 }}>
                                {`View Reviews (${movie.numReviews})`}
                                </Button>}
                            </CardActions>
                        </Card>
                    )
                })
            }
            </div>
            
        </div>
    )
}

export default withStyles(styles)(MovieFinder);