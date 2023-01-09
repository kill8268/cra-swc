import React from 'react';

let size = {width: 0, height: 0};

function subscribe(listener) {
  console.log('subscribe');
  const callback = () => {
    size = {width: window.innerWidth, height: window.innerHeight};
    listener()
  }
  window.addEventListener('load', callback);
  window.addEventListener('resize', callback);
  return () => {
    window.removeEventListener('load', callback);
    window.removeEventListener('resize', callback);
  };
}

function getSnapshot() {
  return size
}

export default function useWindowSize() {
  const isOnline = React.useSyncExternalStore(subscribe, getSnapshot);
  return isOnline;
}