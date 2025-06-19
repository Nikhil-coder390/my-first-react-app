import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {

    const searchHandler = (e)=>{
      setSearchTerm(e.target.value)
    }
  console.log(searchTerm)
  return (
    <div className='search'>
        <div>
            <img src='./assets/search.svg' alt='search'/>
            <input 
            type='text'
            placeholder='Search for a Movie..'
            value={searchTerm}
            onChange={searchHandler}
            />
        </div>
    </div>
  )
}

export default Search