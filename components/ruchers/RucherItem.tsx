import { Rucher } from "@/lib/types/rucherTypes";
import { useQueryClient } from "@tanstack/react-query";
// import { Image } from "expo-image";
import { useBottomSheet } from "@/lib/hooks/useBottomSheet";
import { hapticsLight } from "@/lib/services/hapticsService";
import { QUERY_KEYS } from "@/lib/utils/queryKeys";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useDeleteRucher } from "../../lib/hooks/useRuchers";

interface RucherItemProps {
  rucher: Rucher;
}

export default function RucherItem({ rucher }: RucherItemProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: deleteRucher } = useDeleteRucher();
  const { openBottomSheet } = useBottomSheet();

  const onTouch = () => {
    // hapticsLight();
    queryClient.setQueryData([QUERY_KEYS.RUCHERS.detail(rucher.id)], rucher);
    router.push(`/ruchers/${rucher.id}/show`);
  };

  const handleOpenProfile = () => {
    hapticsLight();
    openBottomSheet({
      id: "profile-sheet",
      component: ProfileBottomSheet,
      props: {
        userId: "123",
        userName: "John Doe",
        onEditProfile: () => {
          // deleteRucher(rucher.id, {
          //   onSuccess: () => {
          //     closeActiveSheet();
          //     console.log("Success from RucherItem");
          //   },
          // });
        },
      },
      snapPoints: [],
      backdropOpacity: 0.5,
    });
  };

  const handleDeleteRucher = async () => {
    Alert.alert("Confirmation", "Are you sure you want to delete this rucher?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Confirmer",
        onPress: () =>
          deleteRucher(
            { rucherId: rucher.id, garder_ruches: false },
            {
              onSuccess: () => {
                console.log("onSuccess callback triggered");
                Alert.alert("Success", "Rucher deleted");
              },
            }
          ),
        style: "destructive",
      },
    ]);
  };

  return (
    <View className='mb-3 px-4'>
      <Pressable
        className='bg-white p-4 rounded-3xl border border-slate-200 active:bg-slate-50 flex flex-row gap-4 items-center overflow-hidden'
        onPress={onTouch}
        onLongPress={handleOpenProfile}
        style={({ pressed }) => [
          {
            transform: [{ scale: pressed ? 0.985 : 1 }],
            shadowColor: "#0F172A",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.06,
            shadowRadius: 20,
            elevation: 2,
          },
        ]}
      >
        <View className='rounded-2xl flex items-center justify-center px-3 py-3 gap-2 flex-row min-w-[84px] bg-emerald-50 border border-emerald-100'>
          <Text className='text-xl font-bold text-emerald-700'>{rucher.ruches_count ?? 110}</Text>
          <Image
            source={require("../../assets/images/ui/ruche.png")}
            className='w-7 h-7'
          />
        </View>

        <View className='flex-1'>
          <Text className='text-lg font-semibold text-slate-900 leading-6 mb-1' numberOfLines={2} ellipsizeMode='tail'>
            {rucher.nom}
          </Text>
          <Text className='text-sm text-slate-500'>Touchez pour voir les détails</Text>
        </View>

        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            handleOpenProfile();
          }}
          className='p-3 bg-slate-50 rounded-2xl active:bg-slate-100 border border-slate-200'
          style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.9 : 1 }] }]}
        >
          <Ionicons name='ellipsis-horizontal' size={18} color='#64748B' />
        </Pressable>
      </Pressable>
    </View>
  );
}

interface ProfileBottomSheetProps {
  userId?: string;
  userName?: string;
  onEditProfile?: () => void;
}

export const ProfileBottomSheet: React.FC<ProfileBottomSheetProps> = ({
  userId = "123",
  userName = "John Doe",
  onEditProfile,
}) => {
  return (
    <View className='flex-1 p-6'>
      <View className='mb-6'>
        <Text className='text-2xl font-bold text-slate-900 mb-2'>Profil</Text>
        <Text className='text-lg text-slate-600 mb-1'>Nom : {userName}</Text>
        <Text className='text-sm text-slate-500'>ID : {userId}</Text>
      </View>

      <View className='mb-6'>
        <Text className='text-sm font-medium text-slate-700 mb-2'>Notes</Text>
        <BottomSheetTextInput
          className='p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900'
          placeholder='Ajouter une note sur ce rucher...'
          multiline
        />
      </View>

      <TouchableOpacity
        className='p-4 bg-emerald-600 rounded-2xl active:bg-emerald-700 flex-row items-center justify-center'
        onPress={onEditProfile}
      >
        <Ionicons name='create-outline' size={20} color='white' style={{ marginRight: 8 }} />
        <Text className='text-lg font-semibold text-white'>Modifier</Text>
      </TouchableOpacity>
    </View>
  );
};
