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
    const apiKey = "71ea7290"
    function handleSubmit(e) {
        e.preventDefault()
        const search = searchText
        fetch(`http://www.omdbapi.com/?s=${search}&type=movie&apikey=${apiKey}`)
        .then(res => res.json())
        .then(response => {
            console.log(response)
            setMovies(response.Search)
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
                movies.map(movie => {
                    return (
                        <Card className={classes.card}>
                            <CardMedia
                            className={classes.media}
                            image={movie.Poster}
                            title="Movie Poster"
                            />
                            <CardContent>
                                <h2>{movie.Title}</h2>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                Add Review
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