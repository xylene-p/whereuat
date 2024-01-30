// NeighborhoodComponent.tsx
import React, { useState, useEffect } from 'react';
import secrets from './secrets';

interface NeighborhoodComponentProps {
  coordinates: { latitude: number; longitude: number };
  isEnabled: boolean;
}

const NeighborhoodComponent: React.FC<NeighborhoodComponentProps> = ({ coordinates, isEnabled }) => {
  const [neighborhood, setNeighborhood] = useState<string | undefined>(undefined);

  useEffect(() => {
    const identifyNeighborhood = async () => {
      try {
        if (isEnabled) {
          const neighborhoodInfo = await getNeighborhood(coordinates);
          setNeighborhood(neighborhoodInfo);
        } else {
          setNeighborhood(undefined);
        }
      } catch (error) {
        console.error(`Error identifying neighborhood: ${(error as Error).message}`);
      }
    };

    identifyNeighborhood();
  }, [coordinates, isEnabled]);

  const getNeighborhood = async (coordinates: { latitude: number; longitude: number }): Promise<string | undefined> => {
    const apiKey = secrets.googleMapsApiKey;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.latitude},${coordinates.longitude}&key=${apiKey}`
    );

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const addressComponents = data.results[0].address_components;
      const neighborhood = addressComponents.find((component: any) => component.types.includes('neighborhood'));
      return neighborhood ? neighborhood.long_name : undefined;
    } else {
      return undefined;
    }
  };

  return (
    <div>
      <p>Neighborhood: {isEnabled ? (neighborhood ? neighborhood : 'N/A') : 'Disabled'}</p>
    </div>
  );
};

export default NeighborhoodComponent;
