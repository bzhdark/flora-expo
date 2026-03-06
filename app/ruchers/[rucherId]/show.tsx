import ParallaxHeaderScrollView from "@/components/ui/ParallaxHeaderScrollView";
import { useDeleteRucher, useRucher } from "@/lib/hooks/useRuchers";
import { ruchersService } from "@/lib/services/rucherService";
import { useQuery } from "@tanstack/react-query";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { Alert, Button, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FicheRucher() {
  const { rucherId } = useLocalSearchParams<{ rucherId: string }>();
  const { rucher } = useRucher(Number(rucherId));
  const { mutate: deleteRucher } = useDeleteRucher();

  const { data, refetch, isRefetching } = useQuery({
    queryKey: ["ruchesByRucherId", rucherId],
    queryFn: () => ruchersService.getRuchesByRucherId(rucherId),
  });

  const handleEndOfListReached = useCallback(() => {
    console.log("Near end of list - trigger load more");
    // TODO: Implement your load more logic here
    // For example: loadMoreRuches();
  }, []);

  const handleDeleteRucher = () => {
    Alert.alert("Confirmation", "Voulez-vous supprimer ce rucher ?", [
      { text: "Annuler", style: "cancel", isPreferred: true },
      {
        text: "Supprimer en gardant les ruches",
        style: "default",
        onPress: () => {
          deleteRucher({ rucherId: Number(rucherId), garder_ruches: true });
          router.back();
        },
      },
      {
        text: "Supprimer les ruches également",
        onPress: () => {
          deleteRucher({ rucherId: Number(rucherId), garder_ruches: false });
          router.back();
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: rucher?.nom ?? "Chargement...",
          headerBackButtonDisplayMode: "minimal",
          headerShown: false,
          headerRight: () => <Button title='Delete' onPress={() => handleDeleteRucher()} />,
        }}
      />

      <ParallaxHeaderScrollView
        backgroundImagePath={require("../../../assets/images/rucher.png")}
        title={rucher?.nom ?? "Chargement..."}
        onEndOfListReached={handleEndOfListReached}
        onRefresh={refetch}
        isRefreshing={isRefetching}
      >
        <SafeAreaView edges={["bottom"]} className='p-4'>
          <Text className='text-lg font-semibold mb-4'>Informations du rucher</Text>
          <Text className='text-base mb-2'>Nom: {rucher?.nom ?? "Chargement..."}</Text>
          <Text className='text-base mb-2'>Description: FicheRucher</Text>
          <Text className='text-base mb-2'>Localisation: À définir</Text>
          <Text className='text-base mb-8'>Nombre de ruches: À définir</Text>
          {data && data.length > 0 && (
            <FlatList
              scrollEnabled={false}
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }: { item: any }) => (
                <View className='h-[200px]'>
                  <Text>{item.reference}</Text>
                </View>
              )}
            />
          )}
        </SafeAreaView>
      </ParallaxHeaderScrollView>
    </>
  );
}
