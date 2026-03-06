import * as Location from "expo-location";
import { AppleMaps } from "expo-maps";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";

// Type definitions
interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationPickerProps {
  onLocationSelect?: (location: Coordinates) => void;
  initialLocation?: Coordinates | null;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect, initialLocation = null }) => {
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(initialLocation);
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);
  // const [mapRegion, setMapRegion] = useState<Region>({
  //   latitude: 37.78825,
  //   longitude: -122.4324,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // });

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async (): Promise<void> => {
    console.log("Fetching current location");
    try {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Permission to access location was denied");
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const newCurrentLocation: Coordinates = { latitude, longitude };
      setCurrentLocation(newCurrentLocation);

      // If no initial location is provided, set current location as selected
      if (!initialLocation) {
        setSelectedLocation(newCurrentLocation);
      }
    } catch (error) {
      Alert.alert("Error", "Could not fetch location");
      console.error("Error getting location:", error);
    }
  };

  // const handleMapPress = (event: MapPressEvent): void => {
  //   const { latitude, longitude } = event.nativeEvent.coordinate;
  //   const newLocation: Coordinates = { latitude, longitude };
  //   setSelectedLocation(newLocation);
  // };

  // const confirmLocation = (): void => {
  //   if (selectedLocation && onLocationSelect) {
  //     onLocationSelect(selectedLocation);
  //   }
  // };

  // const centerOnCurrentLocation = (): void => {
  //   if (currentLocation) {
  //     setMapRegion({
  //       ...currentLocation,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     });
  //   } else {
  //     getCurrentLocation();
  //   }
  // };

  // const formatCoordinate = (value: number): string => {
  //   return value.toFixed(6);
  // };

  return (
    <View className='flex-1'>
      <Stack.Screen options={{ title: "Emplacement", headerBackButtonDisplayMode: "minimal" }} />
      <AppleMaps.View
        style={{ flex: 1 }}
        cameraPosition={{
          coordinates: { latitude: currentLocation?.latitude, longitude: currentLocation?.longitude },
          zoom: 15,
        }}
        onMapClick={({ coordinates }) => {
          const coords: Coordinates = { latitude: coordinates.latitude ?? 0, longitude: coordinates.longitude ?? 0 };
          setSelectedLocation(coords);
          console.log("Selected location", coords);
        }}
        uiSettings={{
          myLocationButtonEnabled: true,
        }}
        markers={
          selectedLocation
            ? [
                {
                  coordinates: selectedLocation,
                  // title: "Votre rucher",
                },
              ]
            : []
        }
      />
    </View>
  );

  // return (
  //   <View className='flex-1'>
  //     <MapView
  //       className='flex-1'
  //       region={mapRegion}
  //       onRegionChangeComplete={setMapRegion}
  //       onPress={handleMapPress}
  //       showsUserLocation={true}
  //       showsMyLocationButton={false}
  //     >
  //       {selectedLocation && (
  //         <Marker
  //           coordinate={selectedLocation}
  //           title='Selected Location'
  //           description={`Lat: ${formatCoordinate(selectedLocation.latitude)}, Lng: ${formatCoordinate(selectedLocation.longitude)}`}
  //           pinColor='red'
  //         />
  //       )}
  //     </MapView>

  //     <View className='bg-white p-4 border-t border-gray-200'>
  //       {selectedLocation ? (
  //         <View>
  //           <Text className='text-base font-bold mb-2'>Selected Coordinates:</Text>
  //           <Text className='text-sm text-gray-600 mb-1'>Latitude: {formatCoordinate(selectedLocation.latitude)}</Text>
  //           <Text className='text-sm text-gray-600'>Longitude: {formatCoordinate(selectedLocation.longitude)}</Text>
  //         </View>
  //       ) : (
  //         <Text className='text-base text-gray-600 text-center'>Tap on the map to select a location</Text>
  //       )}
  //     </View>

  //     <View className='flex-row bg-white px-4 pb-4 gap-3'>
  //       <TouchableOpacity
  //         className='flex-1 bg-blue-500 py-3 rounded-lg items-center active:bg-blue-600'
  //         onPress={centerOnCurrentLocation}
  //       >
  //         <Text className='text-white text-base font-semibold'>My Location</Text>
  //       </TouchableOpacity>

  //       {selectedLocation && (
  //         <TouchableOpacity
  //           className='flex-1 bg-green-500 py-3 rounded-lg items-center active:bg-green-600'
  //           onPress={confirmLocation}
  //         >
  //           <Text className='text-white text-base font-semibold'>Confirm Location</Text>
  //         </TouchableOpacity>
  //       )}
  //     </View>
  //   </View>
  // );
};

export default LocationPicker;
