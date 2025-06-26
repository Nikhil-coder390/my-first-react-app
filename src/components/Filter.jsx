import React from 'react'

const Filter = ({language, setLanguage, year, setYear, rating, setRating, genre, setGenre}) => {
  return (
    <div className='filters flex gap-2 text-center justify-center m-3 flex-wrap'>
        <select className='text-white p-3 rounded-2xl border-amber-300' onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option value="">All Languages</option>
        <option value="en">English</option>
        <option value="te">Telugu</option>
        <option value="hi">Hindi</option>
        <option value="ja">Japanese</option>
      </select>
      <input className='text-white' type='number' placeholder='Year' value={year} onChange={(e)=> setYear(e.target.value)}/>
      <input className='text-white' type='number' placeholder='Min Rating (0-10)' min="0" max="10" value={rating} onChange={(e) => setRating(e.target.value)}/>
      <select className='text-white' onChange={(e) => setGenre(e.target.value)} value={genre}>
        <option value="">All Genres</option>
        <option value="28">Action</option>
        <option value="35">Comedy</option>
        <option value="18">Drama</option>
        <option value="27">Horror</option>
        <option value="10749">Romance</option>
      </select>
    </div>
  )
}

export default Filter