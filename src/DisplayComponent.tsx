// DisplayComponent.js
import React, { useState } from 'react';
import ConfirmationComponent from './ConfirmationComponent';
import './DisplayComponent.css';

interface DisplayComponentProps {
  onConfirm: () => void;
}

const DisplayComponent: React.FC<DisplayComponentProps> = ({ onConfirm }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <div>
      <p>
        You currently have <em>0</em> mystery friends near you that are free to hang within the next <em>hour</em>.
      </p>
      <button onClick={() => setShowConfirmation(true)}>
        i can wait
      </button>

      {showConfirmation && <ConfirmationComponent onConfirm={function (): void {
        throw new Error('Function not implemented.');
      } }/>}
    </div>
  );
};

export default DisplayComponent;
