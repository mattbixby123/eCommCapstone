import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products'
import Books from './components/Books';
import Comics from './components/Comics';
import Magazines from './components/Magazines'
import SingleBook from './components/SingleBook';
import SingleComic from './components/SingleComic';
import SingleMagazine from './components/SingleMagazine';
<<<<<<< Updated upstream
=======
import Logout from './components/Logout';
import HomeSearch from './components/HomeSearch';
import Cart from './components/Cart';
import Account from './components/Account';
import Pagination from './components/Pagination';
import OrderHistory from './components/OrderHistory';
>>>>>>> Stashed changes


function App() {
  

  return (
    
    <>
    <Toolbar />
    <div className='App'>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* May need for search bar <Route path='/product' element={<Product />} /> */}
          <Route path='/books' element={<Books />} />
          <Route path= '/books/:id' element={<SingleBook />}/>
          <Route path='/comic-books' element={<Comics />} />
          <Route path= '/comic-books/:id' element={<SingleComic />}/>
          <Route path='/magazines' element={<Magazines />} />
          <Route path= '/magazines/:id' element={<SingleMagazine />}/>
        </Routes>
        </div>
    <HomeSearch />
    </>
  );
}

export default App;
