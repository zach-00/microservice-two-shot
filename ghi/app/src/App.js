import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoeList from './ShoeList';
import ShoeForm from './ShoeForm';
import HatPage from './HatList.js';
import HatForm from './HatForm.js';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="shoes" element={<ShoeList />}></Route>
          <Route path="hats" element={<HatPage />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
