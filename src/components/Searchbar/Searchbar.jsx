import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './search.css'
const Searchbar = ({searchTerm,setSearchTerm, search,setSearch}) => {
    const handleInputChange = (e) => {
      if(!search){
        
        setSearch(true)
      }
        setSearchTerm(e.target.value);
        // onSearch(e.target.value);
      };
  return (
    <div className="search-bar">
    <input
      type="text"
      className="search-input"
      placeholder="Search Patient..."
      value={searchTerm}
      onChange={handleInputChange}
    />
    <SearchIcon className="search-icon" />
  </div>
  )
}

export default Searchbar