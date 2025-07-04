
import { useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MovieCard from './components/MovieCard'
import Filter from './components/Filter'
import { useDebounce } from 'react-use'

const API_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API
const API_OPT = {
  method : 'GET',
  headers:{
    accept: 'application/json',
    Authorization : `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList,setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [genre, setGenre] = useState('');
  const [debounceSearchTerm,setDebounceSearchTerm] = useState('');

  useDebounce(()=> setDebounceSearchTerm(searchTerm),500,[searchTerm])

  const fetchMovies = async (query = '') =>{
    setIsLoading(true);
    try{
      let endpoint = (query)? `${API_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_URL}/discover/movie?sort_by=popularity.desc`;
      
      const params = new URLSearchParams();
      if(!query){
        if(language) params.append('with_original_language',language);
        if(year) params.append('primary_release_year',year);
        if(rating) params.append('vote_rating.gte', rating);
        if(genre) params.append('with_genres', genre);
      }

      endpoint += `&${params.toString()}`;

      const response = await fetch(endpoint,API_OPT);
      if(!response.ok){
        throw new Error (`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      if(data.results) setMovieList(data.results);
      else throw new Error('No Movies Found');
    }
    catch(error){
      toast.error(`Failed to fetch movies: ${error.message}`)
    }finally{
      setIsLoading(false);
    }
  }
  useEffect(()=>{
    fetchMovies(debounceSearchTerm);
  },[debounceSearchTerm, language, year, rating, genre])
  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
        <header>
          <img src="./src/assets/hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          <Filter
            language={language}
            setLanguage={setLanguage}
            year = {year}
            setYear = {setYear}
            rating = {rating}
            setRating = {setRating}
            genre = {genre}
            setGenre = {setGenre}/>
        </header>
        <section className='all-movies'>
          <h2 className='m-3'>All Movies</h2>
          {isLoading ?(
            <p>Loading...</p>
          ) : (<ul>
            {movieList.map((movie)=>(
              <MovieCard key={movie.id} movie={movie}/>
            ))}
          </ul>)}
        </section>
      </div>
      <ToastContainer/>
    </main>
  )
}

export default App
