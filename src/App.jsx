import { useState } from 'react';
import Home from './pages/Home';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='bg-[#F5ECD5]'>
      <Home />
    </div>
  );
}
