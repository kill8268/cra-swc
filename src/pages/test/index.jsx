import React from 'react';
import useWindowSize from '@hooks/useWindowSize';

export default function App() {

  const size = useWindowSize();

  return (
    <div>
      {size.width}{size.height}
    </div>
  );
}
