import { useState } from 'react';
// import Login from './components/Login';
import { Routes, Route } from 'react-router-dom'
import Welcome from '../client/components/Welcome'

function App() {
  const [count, setCount] = useState(0);

  return (
    
    <>
    <h1>Hello World</h1>
    <div className='App'>
        <Routes>
          <Route path='/' element={<Welcome />} />
          {/* <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/books' element={<AllBooks />} />
          <Route path='/comicBooks' element={<AllComicBooks />} />
          <Route path='/magazines' element={<AllMagazines />} /> */}
        </Routes>
        </div>
    </>
  );
}

export default App;
