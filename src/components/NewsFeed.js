import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from './NewsCard';
import './NewsFeed.css';


const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const apiKey = '261da9afb07c487e92d38ece3bd6cb95';
  const pageSize = 10; // Number of articles per page

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?sources=google-news-in&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
        );
        setNews(response.data.articles);
        setTotalPages(Math.ceil(response.data.totalResults / pageSize));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };
    fetchNews();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="news-feed">
      {loading ? (
        <p className="loading">Loading news...</p>
      ) : (
        <>
          {news.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={page === 1} className="pagination-btn">
              Previous
            </button>
            <span className="page-info">Page {page} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={page === totalPages} className="pagination-btn">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsFeed;