import React, { useState, useEffect } from "react";

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
    <form>
      <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Have a question? Search for answer..."></input>
    </form>
  )
};

export default SearchBar;