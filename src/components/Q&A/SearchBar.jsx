import React, { useState, useEffect } from "react";
import "./qANDaStyles.css";

const SearchBar = ({questions, setFiltered}) => {
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (search.length >= 3) {
      var results = questions.filter((q) => q[1].toLowerCase().includes(search.toLowerCase()));
      setFiltered(results);
    } else {
      setFiltered(questions);
    }
  }, [questions, search]);
  return(
    <form className="searchbar">
      <input className="searchInput" onChange={(e) => setSearch(e.target.value)} type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."></input>
      <div><i></i></div>
    </form>
  )
};

export default SearchBar;