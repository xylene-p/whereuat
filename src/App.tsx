// App.tsx
import React from 'react';
import LocationComponent from './LocationComponent';

const App: React.FC = () => {
  return (
    <div>
      <h1>Get User Location</h1>
      <LocationComponent />
    </div>
  );
};

export default App;
