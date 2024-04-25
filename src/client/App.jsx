import { useState } from 'react';
// import reactLogo from './assets/react.svg';
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
    // <div className='App'>
    //     <h1>Boilerplate</h1>
    //     <img id='comp-img' src='./computer.png'></img>
    //     <p>Replace the starter code in this template with something cool</p>
    //     <Login />
    // </div>
  );
}

export default App;
