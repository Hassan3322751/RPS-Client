import { Route, Routes } from 'react-router-dom';
import Home from "./pages/home-page/home";
import Game_Page from './pages/room-screen/room';

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/room/:roomId' element={<Game_Page />} />
        <Route path='/botRoom' element={<Game_Page />} />
      </Routes>
  );
};

export default App; 