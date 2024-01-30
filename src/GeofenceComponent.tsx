// GeofenceComponent.tsx
import React, { useState, ChangeEvent } from 'react';

interface GeofenceComponentProps {
  setOtherUserLocation: (location: { latitude: number; longitude: number } | null) => void;
}

const GeofenceComponent: React.FC<GeofenceComponentProps> = ({ setOtherUserLocation }) => {
  const [inputLatitude, setInputLatitude] = useState<string>('');
  const [inputLongitude, setInputLongitude] = useState<string>('');

  const handleLatitudeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputLatitude(event.target.value);
  };

  const handleLongitudeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputLongitude(event.target.value);
  };

  const setOtherUserLocationHandler = () => {
    const otherUserLocation = {
      latitude: parseFloat(inputLatitude),
      longitude: parseFloat(inputLongitude),
    };

    setOtherUserLocation(otherUserLocation);
  };

  return (
    <div>
      <div>
        <label>
          Set Other User's Latitude:
          <input type="text" value={inputLatitude} onChange={handleLatitudeChange} />
        </label>
        <label>
          Set Other User's Longitude:
          <input type="text" value={inputLongitude} onChange={handleLongitudeChange} />
        </label>
        <button onClick={setOtherUserLocationHandler}>Set Location</button>
      </div>
    </div>
  );
};

export default GeofenceComponent;
