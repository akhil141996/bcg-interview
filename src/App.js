import React from 'react';
import './App.css';
import LottieLoader from './components/PageLoader';
import HomePage from './pages/HomePage';

function App() {
  const [isLoaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setLoaded({ isLoaded: true }), 1000)
  })
  return (
    <div className="App">
      {
        !isLoaded ? <LottieLoader /> : <HomePage />
      }
    </div>
  );
}

export default App;
