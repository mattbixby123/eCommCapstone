import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import Books from './components/Books';
import Comics from './components/Comics';
import Magazines from './components/Magazines'
import SingleBook from './components/SingleBook';
import SingleComic from './components/SingleComic';
import SingleMagazine from './components/SingleMagazine';
import Logout from './components/Logout';

import Cart from './components/Cart';
import Account from './components/Account';
import Pagination from './components/Pagination';
import OrderHistory from './components/OrderHistory';


function App() {
  

  return (
    
    <>
    <Toolbar />
    <div className='App'>
        <Routes>
          <Route path= '/' element={<Welcome />} />
          <Route path= '/login' element={<Login />} />   
          <Route path= 'account' element={<Account />}></Route> 
          <Route path= '/register' element={<Register />} />
          <Route path= '/books' element={<Books />} />
          <Route path= '/magazines' element={<Magazines />} />
          <Route path= '/comics' element={<Comics />} />
          {/*<Route path= '/product/books/:bookId' element={<SingleBook />}/>
          <Route path= '/product/comics/:comicId' element={<SingleComic />}/>
          <Route path= '/product/magazines/:magazineId' element={<SingleMagazine />}/>
          <Route path= '/logout' element={<Logout/>}/>
          <Route path= '/pagination' element={<Pagination />}/> */}
          <Route path= '/cart' element={<Cart />}/>
          <Route path= '/orderhistory' element={<OrderHistory />}/>
        </Routes>
        </div>
    </>
  );
}

export default App;
