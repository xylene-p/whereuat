// App.js
import React, { useState } from 'react';
import ClickableComponent from './ClickableComponent';
import DisplayComponent from './DisplayComponent';
import ConfirmationComponent from './ConfirmationComponent';

function App() {
  const [showDisplay, setShowDisplay] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleButtonClick = () => {
    setShowDisplay(!showDisplay);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    // You can add logic here for further actions after confirmation
  };

  return (
    <div className="App">
      <h1>wanna hang?</h1>
      <ClickableComponent onClick={handleButtonClick} />
      {showDisplay && <DisplayComponent onConfirm={handleConfirm} />}
      {showConfirmation && <ConfirmationComponent onConfirm={handleConfirm} />}
      <h1><a href="https://partiful.com">later</a></h1>
      <footer>made with every fiber of my <a href="https://instagram.com/kaperez__">being</a> and a dash of love</footer>
    </div>
  );
}

export default App;
