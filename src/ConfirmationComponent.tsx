// ConfirmationComponent.js
import React, { useState } from 'react';
import grassPic from './grass.jpg';

const ConfirmationComponent = ({ onConfirm }: { onConfirm: () => void }) => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isGrass, setShowGrass ] = useState(false);
  const [ isKatFree, setKatFree ] = useState(false);
  const [ isKatLowKey, setKatLowKey ] = useState(false);
  const [ isKatHighKey, setKatHighKey ] = useState(false);

  const handleLaterClick = () => {
    setIsLoading(true);

    const id = window.setTimeout(() => {
      setIsLoading(false);
      setKatFree(true);
    }, 3000);
    
  };

  const showLowKeyActivities = () => {
    setKatLowKey(true);
  };

  const showHighKeyActivities = () => {
    setKatHighKey(true);
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
      {isKatFree && 
      <div>kat is free and nearby!
        <button onClick={showLowKeyActivities}>low-key hang</button>
        <button onClick={showHighKeyActivities}>high-key hang</button>
      </div>}
      {isKatLowKey && <div>let's go take a walk at a park that's near both of us. searching for parks...</div>}
      {isKatHighKey && <div>searching for a place on our (corner) bucket lists that's near the both of us or searching for stuff on instagram that we both are into unless you don't care, then i'll just give you something random to do</div>}
      {isGrass && <img src={grassPic} alt="grass" />}
    </div>
  );
};

export default ConfirmationComponent;
