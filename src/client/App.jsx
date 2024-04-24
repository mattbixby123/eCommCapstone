import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Login from './components/Login';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<WelcomeScreen />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/books' element={<AllBooks />} />
          <Route path='/comicBooks' element={<AllComicBooks />} />
          <Route path='/magazines' element={<AllMagazines />} />
        </Routes>
      </Router>
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
