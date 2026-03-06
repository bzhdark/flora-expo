import { useUser } from "@/lib/hooks/useUser";
import { FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { router, Stack } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import MenuTile from "../../components/ui/MenuTile";
import TileWrapper from "../../components/ui/TileWrapper";

export default function ParametresScreen() {
  const { data: user } = useUser();

  return (
    <View className='flex-1'>
      <ScrollView className='flex-1 p-4' keyboardShouldPersistTaps='handled'>
        <Stack.Screen options={{ headerLeft: () => <DrawerToggleButton tintColor='black' />, headerShown: true }} />
        <Text className='text-xl font-semibold text-gray-700 mb-2'>Mon exploitation</Text>
        <TileWrapper>
          {user?.role?.peut_modifier_exploitation && (
            <MenuTile
              title="Coordonnées de l'exploitation"
              icon={<MaterialCommunityIcons name='home-silo' size={21} color='gray' />}
              onPress={() => {
                router.push("/parametres/exploitation");
              }}
            />
          )}

          {user?.role?.peut_gerer_roles && (
            <MenuTile
              title='Rôles'
              icon={<FontAwesome5 name='user-friends' size={19} color='gray' />}
              onPress={() => {
                router.push("/parametres/roles");
              }}
            />
          )}

          <MenuTile
            title='Type de sirops'
            icon={<FontAwesome6 name='droplet' size={19} color='gray' />}
            onPress={() => {
              router.push("/parametres/sirops");
            }}
          />

          <MenuTile
            title='Modèles de ruches'
            icon={<MaterialCommunityIcons name='archive-cog' size={21} color='gray' />}
            onPress={() => {
              router.push("/parametres/modeles-ruches");
            }}
          />
          <MenuTile
            title='Miéllées'
            icon={<MaterialCommunityIcons name='flower' size={21} color='gray' />}
            onPress={() => {
              router.push("/parametres/miellees");
            }}
          />
          <MenuTile
            title='Hausses'
            icon={<FontAwesome6 name='box' size={21} color='gray' />}
            onPress={() => {
              router.push("/parametres/hausses");
            }}
          />

          <MenuTile
            title='Apiculteurs'
            icon={<FontAwesome5 name='users-cog' size={19} color='gray' />}
            onPress={() => { }}
          />

          <MenuTile title='Souches' icon={<FontAwesome5 name='venus' size={20} color='gray' />} onPress={() => { }} />
          <MenuTile title='QR Codes' icon={<FontAwesome6 name='qrcode' size={19} color='gray' />} onPress={() => { }} />
          <MenuTile
            title='Préférences'
            icon={<FontAwesome6 name='sliders' size={18} color='gray' />}
            onPress={() => { }}
          />
        </TileWrapper>

        <Text className='text-xl font-semibold text-gray-700 mb-2 mt-7'>Mon compte</Text>
        <TileWrapper>
          <MenuTile
            title='Mes coordonnées'
            icon={<FontAwesome6 name='user-gear' size={19} color='gray' />}
            onPress={() => { }}
          />
          <MenuTile
            title='Mes exploitations'
            icon={<FontAwesome6 name='house-user' size={19} color='gray' />}
            onPress={() => { }}
          />
          <MenuTile
            title="Changer d'exploitation"
            icon={<MaterialCommunityIcons name='refresh' size={21} color='gray' />}
            onPress={() => { }}
          />
        </TileWrapper>

        <Text className='text-xl font-semibold text-gray-700 mb-2 mt-7'>L&apos;application</Text>
        <TileWrapper className='mb-20'>
          <MenuTile
            title='Préférences générales'
            icon={<Ionicons name='settings' size={21} color='gray' />}
            onPress={() => { }}
          />
          <MenuTile
            title='Quoi de neuf ?'
            icon={<Ionicons name='information-circle' size={23} color='gray' />}
            onPress={() => { }}
          />
          <MenuTile
            title='Aide et support'
            icon={<MaterialCommunityIcons name='help-rhombus' size={23} color='gray' />}
            onPress={() => { }}
          />
        </TileWrapper>
      </ScrollView>
    </View>
  );
}
