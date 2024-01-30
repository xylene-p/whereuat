// DistanceComponent.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import secrets from './secrets';

interface DistanceComponentProps {
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
}

const DistanceComponent: React.FC<DistanceComponentProps> = ({ origin, destination }) => {
  const [duration, setDuration] = useState<string | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWalkingDistance = async () => {
      try {
        const apiKey = secrets.googleDirectionsApiKey;
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&mode=walking&key=${apiKey}`
        );

        const data = response.data;

        if (data.status === 'OK' && data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const leg = route.legs[0];
          setDuration(leg.duration ? leg.duration.text : null);
          setDistance(leg.distance ? leg.distance.text : null);
        } else {
          setError('Unable to retrieve walking distance information.');
        }
      } catch (error) {
        setError(`Error retrieving walking distance: ${(error as any).message}`);
      }
    };

    getWalkingDistance();
  }, [origin, destination]);

  return (
    <div>
      {duration && <p>Walking Time: {duration}</p>}
      {distance && <p>Walking Distance: {distance}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default DistanceComponent;
