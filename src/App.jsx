import React from 'react';
import CovidChart from './components/CovidChart';
import Provinces from './components/Provinces';
import Regions from './components/Regions';

function App() {
  return (
    <div className="App">
      {/* <Regions /> */}
      <CovidChart />
      <Provinces />
    </div>
  );
}

export default App;
