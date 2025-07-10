
import { useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search'
import heroImg from './assets/hero.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use'
import { updateSearchCount, displayTrendingMovie } from './appwrite'

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
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [debounceSearchTerm,setDebounceSearchTerm] = useState('');

  useDebounce(()=> setDebounceSearchTerm(searchTerm),500,[searchTerm])

  const fetchMovies = async (query = '') =>{
    setIsLoading(true);
    try{
      let endpoint = (query)? `${API_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint,API_OPT);
      if(!response.ok){
        throw new Error (`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if(data.results){ setMovieList(data.results);}
      else {throw new Error('No Movies Found');}

      if(query && data.results.length>0){
        await updateSearchCount(query,data.results[0]);
      }
    }
    catch(error){
      toast.error(`Failed to fetch movies: ${error.message}`)
    }finally{
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async ()=>{
    try{
      const movies = await displayTrendingMovie();
      setTrendingMovies(movies);

    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchMovies(debounceSearchTerm);
  },[debounceSearchTerm])

  useEffect(()=>{
    loadTrendingMovies();
  },[]);
  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
        <header>
          <img src={heroImg} alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        {trendingMovies.length>0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie,index)=>(
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title}/>
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className='all-movies'>
          <h2 className=''>All Movies</h2>
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
