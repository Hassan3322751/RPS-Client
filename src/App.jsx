import { Route, Routes } from 'react-router-dom';
import Home from "./pages/home-page/home";
import Game_Page from './pages/room-screen/room';

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/room/:roomId' element={<Game_Page roomType={"PUBLIC"} />} />
        <Route path='/privateRoom/:roomId' element={<Game_Page roomType={"PRIVATE"} />} />
        <Route path='/botRoom' element={<Game_Page roomType={"BOT"} />} />
      </Routes>
  );
};

export default App; 