import { GoogleMaps } from "expo-maps";
import React from "react";
import { View } from "react-native";

export default function RucherLocationPickerAndroid() {
  return (
    <View className='flex-1'>
      <GoogleMaps.View
        style={{ flex: 1 }}
        cameraPosition={{
          coordinates: { latitude: 0, longitude: 0 },
          zoom: 15,
        }}
      />
    </View>
  );
}
