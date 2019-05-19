import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    card: {
      maxWidth: 150,
    },
    media: {
      height: 300,
    },
  };

const MovieFinder = props => {
    const { classes } = props
    const sampleMovie = {
        Poster: "https://m.media-amazon.com/images/M/MV5BZGNhYTA1ODMtY2M5Yy00MTYwLWFlZmEtNDM4M2I4ZTI2ZmVmXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
        Rated: "PG",
        Ratings: [{Source: "Internet Movie Database", Value: "7.8/10"}, {Source: "Rotten Tomatoes", Value: "95%"}, {Source: "Metacritic", Value: "80/100"}],
        Title: "Food, Inc.",
        Year: "2008",
        imdbID: "tt1286537"
    }
    const [searchText, setSearchText] = useState('food')
    const [movies, setMovies] = useState([])
    const apiKey = "aa1ce36898e53cf79394f7c59ef6ddbc"
    function handleSubmit(e) {
        e.preventDefault()
        const search = searchText
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&page=1`)
        .then(res => res.json())
        .then(response => {
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
            <div class='movies'>
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
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                Add Review
                                </Button>
                                <Button size="small" color="primary">
                                View Reviews
                                </Button>
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