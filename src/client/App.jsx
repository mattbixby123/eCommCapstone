import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
// import Product from './components/Product'
import Books from './components/Books';
import Comics from './components/Comics';
import Magazines from './components/Magazines'
import SingleBook from './components/SingleBook';
import SingleComic from './components/SingleComic';
import SingleMagazine from './components/SingleMagazine';

function App() {
  const [count, setCount] = useState(0);

  return (
    
    <>
    <Toolbar />
    <div className='App'>
        <Routes>
          <Route path= '/' element={<Welcome />} />
          <Route path= '/login' element={<Login />} />
          <Route path= '/register' element={<Register />} />
          {/* May need for search bar <Route path='/product' element={<Product />} /> */}
          <Route path= '/books' element={<Books />} />
          <Route path= '/books/:id' element={<SingleBook />}/>
          <Route path= '/comics' element={<Comics />} />
          <Route path= '/comics/:id' element={<SingleComic />}/>
          <Route path= '/magazines' element={<Magazines />} />
          <Route path= '/magazines/:id' element={<SingleMagazine />}/>
        </Routes>
        </div>
    </>
  );
}

export default App;
