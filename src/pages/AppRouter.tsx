import { Routes, Route } from 'react-router-dom';
import { ConfigPlay } from './ConfigPlay';
import { Home } from './Home';
import { Playzone } from './Playzone';

const AppRouter = () => {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/configplay' element={<ConfigPlay />} />
        {/* <Route path='/playzone/:amount/:category/:difficulty' element={<Playzone />} /> */}
        <Route path='/playzone/:type' element={<Playzone />} />
      </Routes>
  )
}

export {AppRouter}