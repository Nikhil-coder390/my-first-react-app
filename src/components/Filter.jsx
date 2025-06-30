import React from 'react'

const Filter = ({language, setLanguage, year, setYear, rating, setRating, genre, setGenre}) => {
  return (
    <div className='filters flex gap-2 text-center justify-center m-3 flex-wrap'>
        <select className='text-white p-3 rounded-2xl border-amber-300 w-48 h-12' onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option value="" className='text-black'>All Languages</option>
        <option value="en" className='text-black'>English</option>
        <option value="te" className='text-black'>Telugu</option>
        <option value="hi" className='text-black'>Hindi</option>
        <option value="ja" className='text-black'>Japanese</option>
      </select>
      <input className='text-white p-3 rounded-2xl border-amber-300 w-48 h-12' type='number' placeholder='Year' value={year} onChange={(e)=> setYear(e.target.value)}/>
      <input className='text-white p-3 rounded-2xl border-amber-300 w-48 h-12' type='number' placeholder='Min Rating (0-10)' min="0" max="10" value={rating} onChange={(e) => setRating(e.target.value)}/>
      <select className='text-white p-3 rounded-2xl border-amber-300 w-48 h-12' onChange={(e) => setGenre(e.target.value)} value={genre}>
        <option value="">All Genres</option>
        <option value="28" className='text-black'>Action</option>
        <option value="35" className='text-black'>Comedy</option>
        <option value="18" className='text-black'>Drama</option>
        <option value="27" className='text-black'>Horror</option>
        <option value="10749"className='text-black'>Romance</option>
      </select>
    </div>
  )
}

export default Filter