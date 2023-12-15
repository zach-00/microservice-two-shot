import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoeList from './ShoeList';
import ShoeForm from './ShoeForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />

          <Route path="shoes" element={<ShoeList />}></Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
