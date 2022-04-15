import React, { useEffect, useState } from "react";
import Youtube from 'react-youtube';
import axios from "../../axios";
import "./RowPost.css";
function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId,setUrlId] =useState('');
  const base_url = "https://image.tmdb.org/t/p/original/";
  useEffect((response) => {
    axios
      .get(props.url)
      .then((response) => {
        setMovies(response.data.results);
        return response
      }).catch(err=>{
        alert('Network Error')
      })
  }, []);
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
    
      autoplay: 1,
    },
  };
  const handleMovie=(id)=>{
axios.get(`/movie/${id}/videos?api_key=7d3a6e1310d289aee91adb4bea239d1b&language=en-US`).
then(response=>{
if(response.data.results.length !== 0){
  setUrlId(response.data.results[0])
}
})
  }
  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            onClick={()=>handleMovie(obj.id)}
            className={props.isSmall?'smallPoster':"poster"}
            alt="poster"
            src={`${base_url+obj.backdrop_path}`} key={
              obj.id}
          />
        ))}
      </div>
    { urlId && <Youtube videoId={urlId.key} opts={opts} />}
    </div>
  );
}

export default RowPost;
