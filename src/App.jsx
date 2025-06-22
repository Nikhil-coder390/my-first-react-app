
import { useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MovieCard from './components/MovieCard'

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

  const fetchMovies = async () =>{
    setIsLoading(true);
    try{
      const endpoint = `${API_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint,API_OPT);
      if(!response.ok){
        throw new Error (`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      if(data.Response === 'False'){
        setMovieList([]);
        throw new Error('Failed to fetch moives');
      }
      setMovieList(data.results || [])
    }
    catch(error){
      toast.error(`Failed to fetch movies: ${error.message}`)
    }finally{
      setIsLoading(false);
    }
  }
  useEffect(()=>{
    fetchMovies();
  },[])
  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
        <header>
          <img src="./src/assets/hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        <section className='all-movies'>
          <h2>All Movies</h2>
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
