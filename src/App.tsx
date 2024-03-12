import * as React from 'react';
import { useEffect, useState } from 'react';
import Dashboard from './components/dashboard';
import SingleBox from './components/singlebox'; 
import { Provider } from 'react-redux';
import { store } from './app/store';

const App: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState('main');

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#box/')) {
      setCurrentComponent('singleBox');
    }
  }, []);

  switch (currentComponent) {
    case 'singleBox':
      return <Provider store={store}><SingleBox /></Provider>;
    case 'main':
    default:
      return <Dashboard />;
  }

  // return (
  //   <div>
  //     <Dashboard />
  //   </div>
  // );
};

export default App;
