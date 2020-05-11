import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import PostBlogs from './components/postblogs';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <PostBlogs />
    </React.Fragment>
  );
}

export default App;
