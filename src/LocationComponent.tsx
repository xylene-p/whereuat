// LocationComponent.tsx
import secrets from './secrets';
import React, { useState, useEffect, ChangeEvent } from 'react';

const LocationComponent: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number; neighborhood?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputLatitude, setInputLatitude] = useState<string>('');
  const [inputLongitude, setInputLongitude] = useState<string>('');

  useEffect(() => {
    // Check if Geolocation is supported by the browser
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          // Use reverse geocoding to get neighborhood information
          try {
            const neighborhood = await getNeighborhood(userLocation);
            setLocation({ ...userLocation, neighborhood });
          } catch (error) {
            setError(`Error getting neighborhood: ${(error as Error).message}`);
          }
        },
        (error) => {
          setError(`Error getting location: ${error.message}`);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  const handleLatitudeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputLatitude(event.target.value);
  };

  const handleLongitudeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputLongitude(event.target.value);
  };

  const simulateLocation = async () => {
    const simulatedLocation = {
      latitude: parseFloat(inputLatitude),
      longitude: parseFloat(inputLongitude),
    };

    try {
      const neighborhood = await getNeighborhood(simulatedLocation);
      setLocation({ ...simulatedLocation, neighborhood });
    } catch (error) {
      setError(`Error getting neighborhood: ${(error as Error).message}`);
    }
  };

  const getNeighborhood = async (coordinates: { latitude: number; longitude: number }): Promise<string | undefined> => {
    const apiKey = secrets.googleMapsApiKey;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.latitude},${coordinates.longitude}&key=${apiKey}`
    );

    console.log("getting neighborhood");
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // Extract neighborhood name from the results
      const addressComponents = data.results[0].address_components;
      const neighborhood = addressComponents.find((component: any) => component.types.includes('neighborhood'));
      return neighborhood ? neighborhood.long_name : undefined;
    } else {
      return undefined;
    }
  };

  return (
    <div>
      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          {location.neighborhood && <p>Neighborhood: {location.neighborhood}</p>}
        </div>
      )}
      <div>
        <label>
          Simulate Latitude:
          <input type="text" value={inputLatitude} onChange={handleLatitudeChange} />
        </label>
        <label>
          Simulate Longitude:
          <input type="text" value={inputLongitude} onChange={handleLongitudeChange} />
        </label>
        <button onClick={simulateLocation}>Simulate Location</button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LocationComponent;
