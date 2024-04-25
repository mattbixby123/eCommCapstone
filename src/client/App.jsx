import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Toolbar from './components/ToolBar';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
// import Product from './components/Product'
import Books from './components/Books';
import Comics from './components/Comics';
import Magazines from './components/Magazines'

function App() {
  const [count, setCount] = useState(0);

  return (
    
    <>
    <Toolbar />
    <h1>Hello World</h1>
    <div className='App'>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* May need for search bar <Route path='/product' element={<Product />} /> */}
          <Route path='/books' element={<Books />} />
          <Route path='/comicBooks' element={<Comics />} />
          <Route path='/magazines' element={<Magazines />} />
        </Routes>
        </div>
    </>
  );
}

export default App;
