import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios'; 
import NewsCard from './NewsCard';
import NewsCardDetails from './NewsCardDetails';
const Home = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const getApiData = async () => {
    try {
      const res = await axios.get("https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=3e817333f4514eb58cf74c8ae045c64d");
      setData(res.data.articles);
      setFilteredData(res.data.articles); 
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getApiData();
  }, []);

  const handleSearch = () => {
    if (searchInput.trim() === '') {
      setFilteredData(data);
    } else {
      const filteredArticles = data.filter(article =>
        article.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredData(filteredArticles);
    }
  };
return (
    <>
      <Router>
        <div className="navbar">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            
        

            </ul>
            <div className='search-container'>
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button className="search-button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<NewsCard data={filteredData} />} />
            <Route path="/newsData/:id" element={<NewsCardDetails data={data} />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default Home;