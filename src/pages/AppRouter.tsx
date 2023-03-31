import { Routes, Route } from 'react-router-dom';
import { Instructions } from './Instructions';
import { ConfigPlay } from './ConfigPlay';
import { GameOver } from './GameOver';
import { Home } from './Home';
import { Playzone } from './Playzone';

const AppRouter = () => {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/instructions' element={<Instructions />} />
        <Route path='/configplay' element={<ConfigPlay />} />
        <Route path='/gameover/:good/:bad' element={<GameOver />} />
        <Route path='/playzone/:type' element={<Playzone />} />
      </Routes>
  )
}

export {AppRouter}