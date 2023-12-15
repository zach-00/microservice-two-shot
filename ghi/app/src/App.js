import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatPage from './HatList.js';
import HatForm from './HatForm.js';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="hats" element={<HatPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
