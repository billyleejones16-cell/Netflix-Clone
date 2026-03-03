import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDYzMmMxNWY1OGFmMWMwNGU4Nzc5MDcyNmVhZmM2NSIsIm5iZiI6MTc3MjQzMDk5OC4yODksInN1YiI6IjY5YTUyNjk2YTM3N2U3MzFiMWZmNjZmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5KLFDtbqeuo30Ci64pZ2LO98KHeOQAKsAgdnSy5mm0E'
  }
};

const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(() => {

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(data => setApiData(data.results))
    .catch(err => console.error(err));

  const ref = cardsRef.current;
  if (ref) {
    ref.addEventListener('wheel', handleWheel);
    // cleanup
    return () => ref.removeEventListener('wheel', handleWheel);
  }
}, []);

  return (
    <div className='title-cards'>
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className="card-list" ref={cardsRef}>
          {apiData.map((card, index)=>{
            return <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          })}
        </div>
    </div>
  )
}

export default TitleCards
