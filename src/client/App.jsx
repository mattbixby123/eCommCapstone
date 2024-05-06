import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import Product from './components/Product'
import Books from './components/Books';
import Comics from './components/Comics';
import Magazines from './components/Magazines'
import SingleBook from './components/SingleBook';
import SingleComic from './components/SingleComic';
import SingleMagazine from './components/SingleMagazine';
import Logout from './components/Logout';
import HomeSearch from './components/HomeSearch';


function App() {
  

  return (
    
    <>
    <Toolbar />
    <div className='App'>
        <Routes>
          <Route path= '/' element={<Welcome />} />
          <Route path= '/login' element={<Login />} />    
          <Route path= '/register' element={<Register />} />
          <Route path= '/books' element={<Books />} />
          <Route path= '/product/books/:bookId' element={<SingleBook />}/>
          <Route path= '/comics' element={<Comics />} />
          <Route path= '/product/comics/:comicId' element={<SingleComic />}/>
          <Route path= '/magazines' element={<Magazines />} />
          {/* <Route path= '/magazines/:id' element={<SingleMagazine />}/> */}
          <Route path='/logout' element={<Logout/>}/>
          <Route path= '/product/magazines/:magazineId' element={<SingleMagazine />}/>
        </Routes>
        </div>
    <HomeSearch />
    </>
  );
}

export default App;
