// LocationComponent.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import secrets from './secrets';
import GeofenceComponent from './GeofenceComponent';
import NeighborhoodComponent from './NeighborhoodComponent';
import DistanceComponent from './DistanceComponent';

const LocationComponent: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [otherUserLocation, setOtherUserLocation] = useState<{ latitude: number; longitude: number } | null>({
    latitude: 37.7749, // Example latitude for another user
    longitude: -122.4194, // Example longitude for another user
  });
  const [geofenceRadius, setGeofenceRadius] = useState<number>(1000); // Default geofence radius is 1000 meters
  const [error, setError] = useState<string | null>(null);
  const [inputAddress, setInputAddress] = useState<string>('');
  const [watching, setWatching] = useState<boolean>(false);
  const [neighborhoodEnabled, setNeighborhoodEnabled] = useState<boolean>(true);

  useEffect(() => {
    // Start watching for location updates when the component mounts
    if (watching) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(userLocation);
        },
        (error) => {
          setError(`Error getting location: ${error.message}`);
        }
      );

      // Cleanup the watch when the component unmounts or when watching is stopped
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [watching]);

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputAddress(event.target.value);
  };

  const getCoordinatesFromAddress = async () => {
    try {
      const coordinates = await geocodeAddress(inputAddress);
      setLocation({ ...coordinates });
    } catch (error) {
      setError(`Error getting location: ${(error as Error).message}`);
    }
  };

  const geocodeAddress = async (address: string): Promise<{ latitude: number; longitude: number }> => {
    const apiKey = secrets.googleMapsApiKey;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const locationInfo = data.results[0].geometry.location;
      const coordinates = {
        latitude: locationInfo.lat,
        longitude: locationInfo.lng,
      };
      return coordinates;
    } else {
      throw new Error('No results found for the provided address.');
    }
  };

  const isOtherUserWithinGeofence = (): boolean => {
    if (location && otherUserLocation) {
      // Calculate distance between the two locations
      const distance = getDistance(location, otherUserLocation);

      // Check if the distance is within the geofence radius specified by the first user
      return distance <= geofenceRadius;
    }

    return false;
  };

  const getDistance = (coord1: { latitude: number; longitude: number }, coord2: { latitude: number; longitude: number }): number => {
    const latDiff = coord2.latitude - coord1.latitude;
    const lonDiff = coord2.longitude - coord1.longitude;
    return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
  };

  const startWatching = () => {
    setWatching(true);
  };

  const stopWatching = () => {
    setWatching(false);
  };

  const handleGeofenceRadiusChange = (event: ChangeEvent<HTMLInputElement>) => {
    const radius = parseInt(event.target.value, 10);
    setGeofenceRadius(isNaN(radius) ? 0 : radius);
  };

  const toggleNeighborhood = () => {
    setNeighborhoodEnabled((prev) => !prev);
  };

  return (
    <div>
      <GeofenceComponent setOtherUserLocation={setOtherUserLocation} />

      <div>
        <label>
          Enter Address:
          <input type="text" value={inputAddress} onChange={handleAddressChange} />
        </label>
        <button onClick={getCoordinatesFromAddress}>Get Location</button>
      </div>

      <div>
        <label>
          Set Geofence Radius (meters):
          <input type="text" value={geofenceRadius} onChange={handleGeofenceRadiusChange} />
        </label>
      </div>

      <div>
        <button onClick={startWatching}>Start Updating Location</button>
        <button onClick={stopWatching}>Stop Updating Location</button>
      </div>

      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}

      {otherUserLocation && (
        <div>
          <p>Other User's Location:</p>
          <p>Latitude: {otherUserLocation.latitude}</p>
          <p>Longitude: {otherUserLocation.longitude}</p>
        </div>
      )}

      <NeighborhoodComponent coordinates={location || { latitude: 0, longitude: 0 }} isEnabled={neighborhoodEnabled} />

      {isOtherUserWithinGeofence() ? (
        <p>Other user is within the specified geofence!</p>
      ) : (
        <p>Other user is outside the specified geofence.</p>
      )}

      <DistanceComponent origin={location || { latitude: 0, longitude: 0 }} destination={otherUserLocation || { latitude: 0, longitude: 0 }} />

      <div>
        <button onClick={toggleNeighborhood}>Toggle Neighborhood Identification</button>
      </div>
    </div>
  );
};

export default LocationComponent;
