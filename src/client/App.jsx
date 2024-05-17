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
import SingleProduct from './components/SingleProduct';
import Logout from './components/Logout';
import Cart from './components/Cart';
import Account from './components/Account';
import OrderHistory from './components/OrderHistory';
import AdminView from './components/AdminView';
import AddProduct from './components/AddProduct';


function App() {
  

  return (
    
    <>
    <Toolbar />
    <div className='App'>
        <Routes>
          <Route path= '/' element={<Welcome />} />
          <Route path= '/login' element={<Login />} />   
          <Route path= '/account' element={<Account />} /> 
          <Route path= '/register' element={<Register />} />
          <Route path= '/books' element={<Books />} />
          <Route path= '/magazines' element={<Magazines />} />
          <Route path= '/comics' element={<Comics />} />
          <Route path= '/product/books/:bookId' element={<SingleBook />}/>
          <Route path= '/product/comics/:comicId' element={<SingleComic />}/>
          <Route path= '/product/magazines/:magazineId' element={<SingleMagazine />}/>
          <Route path= '/product/:productId' element={<SingleProduct />}/>
          <Route path= '/logout' element={<Logout/>}/>
          <Route path= '/cart' element={<Cart />}/>
          <Route path= '/orderDetail/:customerId' element={<OrderHistory />}/>
          <Route path= '/admin' element={<AdminView />} />
          <Route path= '/productform' element={<AddProduct />}/> 
        </Routes>
        </div>
    </>
  );
}

export default App;
