import React, { useState, useEffect } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState('');
  // useEffect(() => {
  //   if (search.length >= 3) {
  //     var test = questions.filter((q) => {q[1].toLowerCase().includes(search.toLowerCase())}).map((q) => {q});
  //     setFiltered(test);
  //   } else {
  //     setFiltered(questions);
  //   }
  // }, [search]);
  return(
    <form>
      <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Have a question? Search for answer..."></input>
    </form>
  )
};

export default SearchBar;