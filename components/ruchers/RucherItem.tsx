import { Rucher } from "@/lib/models/rucher.model";
import React from "react";
import { Alert, Text, TouchableOpacity } from "react-native";

interface RucherItemProps {
  rucher: Rucher;
}

export default function RucherItem({ rucher }: RucherItemProps) {

  const onTouch = () => {
    Alert.alert("Rucher", rucher.nom);
  }

  return (

    <TouchableOpacity className="bg-white p-4 rounded-lg shadow-md" onPress={onTouch}>
      <Text>{rucher.nom}</Text>
    </TouchableOpacity>

  );
}
