// ConfirmationComponent.js
import React, { useState } from 'react';
import grassPic from './grass.jpg';

const ConfirmationComponent = ({ onConfirm }: { onConfirm: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGrass, setShowGrass] = useState(false);

  const handleLaterClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 36000);
  };

  const openCorner = () => {
    setShowGrass(true);
    window.open('https://corner.inc', '_blank');
  }
  return (
    <div>
      <p>what do u want to do?</p>
      <button onClick={openCorner}>touch grass</button>
      <button onClick={handleLaterClick}>wait</button>

      {isLoading && <div>i'll let u know when a friend is free and nearby within the next <em>hour</em><div className="spinner"></div></div> }
      {isGrass && <img src={grassPic} alt="grass" />}
    </div>
  );
};

export default ConfirmationComponent;
