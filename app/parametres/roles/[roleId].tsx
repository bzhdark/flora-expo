import HeaderButton from "@/components/ui/HeaderButton";
import ThemedView from "@/components/ui/ThemedView";
import { useRole } from "@/lib/hooks/useRoles";
import { Role } from "@/lib/types/roleTypes";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

interface DroitItem {
  key: keyof Role;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  category: string;
}

const droitsConfig: DroitItem[] = [
  {
    key: "is_proprietaire",
    label: "Propriétaire",
    icon: "star",
    category: "Accès",
  },
  {
    key: "acces_complet_ruchers",
    label: "Accès complet aux ruchers",
    icon: "map",
    category: "Accès",
  },
  {
    key: "peut_creer_ruches",
    label: "Créer des ruches",
    icon: "home",
    category: "Création",
  },
  {
    key: "peut_creer_ruchers",
    label: "Créer des ruchers",
    icon: "location",
    category: "Création",
  },
  {
    key: "peut_creer_taches",
    label: "Créer des tâches",
    icon: "checkmark-circle",
    category: "Création",
  },
  {
    key: "peut_modifier_planning",
    label: "Modifier le planning",
    icon: "calendar",
    category: "Modification",
  },
  {
    key: "peut_inviter_apiculteurs",
    label: "Inviter des apiculteurs",
    icon: "person-add",
    category: "Gestion",
  },
  {
    key: "peut_modifier_exploitation",
    label: "Modifier l'exploitation",
    icon: "business",
    category: "Modification",
  },
  {
    key: "peut_exporter_documents",
    label: "Exporter des documents",
    icon: "download",
    category: "Export",
  },
  {
    key: "peut_gerer_roles",
    label: "Gérer les rôles",
    icon: "people",
    category: "Gestion",
  },
];

const categories = ["Accès", "Création", "Modification", "Gestion", "Export"];

export default function RoleScreen() {
  const { roleId } = useLocalSearchParams<{ roleId: string }>();
  const { data: role } = useRole(Number(roleId));

  if (!role) {
    return (
      <ThemedView className='p-4'>
        <Stack.Screen options={{ title: "Chargement..." }} />
        <Text className='text-center text-gray-500 mt-8'>Chargement du rôle...</Text>
      </ThemedView>
    );
  }

  const droitsParCategorie = categories.map((category) => ({
    category,
    droits: droitsConfig.filter((droit) => droit.category === category),
  }));

  return (
    <ThemedView className='flex-1'>
      <Stack.Screen
        options={{
          title: role.nom,
          headerRight: () => (
            <HeaderButton
              icon='pencil'
              onPress={() => router.push(`/parametres/roles/${roleId}/edit`)}
              className='ml-1.5'
            />
          ),
        }}
      />
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        <View className='pb-5'>
          <View className='p-4'>
            {/* Liste des droits par catégorie */}
            {droitsParCategorie.map(({ category, droits }, index) => {
              if (droits.length === 0) return null;

              return (
                <View key={`${category}-${index}`} className='mb-6'>
                  <Text className='text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 px-1'>
                    {category}
                  </Text>
                  <View className='gap-3'>
                    {droits.map((droit) => {
                      const isActive = role[droit.key] === true;
                      return (
                        <View
                          key={`${droit.label}`}
                          className='bg-white rounded-2xl border border-gray-100 p-4 flex-row items-center gap-4'
                        >
                          <View
                            className={`w-12 h-12 rounded-xl items-center justify-center ${
                              isActive ? "bg-green-50" : "bg-gray-50"
                            }`}
                          >
                            <Ionicons name={droit.icon} size={24} color={isActive ? "#10b981" : "#9ca3af"} />
                          </View>
                          <View className='flex-1'>
                            <Text className={`text-base font-semibold ${isActive ? "text-gray-900" : "text-gray-400"}`}>
                              {droit.label}
                            </Text>
                          </View>
                          <View
                            className={`w-6 h-6 rounded-full items-center justify-center ${
                              isActive ? "bg-green-100" : "bg-gray-100"
                            }`}
                          >
                            {isActive ? (
                              <Ionicons name='checkmark' size={16} color='#10b981' />
                            ) : (
                              <Ionicons name='close' size={16} color='#9ca3af' />
                            )}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
          <View className='px-4 pb-5'>
            <Text className='text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 px-1'>Ruchers</Text>
            <View className='gap-3'>
              {role.ruchers?.map((rucher, i) => (
                <View
                  key={`${rucher.id}-${i}`}
                  className='bg-white rounded-2xl border border-gray-100 p-4 flex-row items-center gap-4'
                >
                  <View className='w-10 h-10 rounded-xl bg-teal-50 items-center justify-center'>
                    <Ionicons name='location' size={20} color='#14b8a6' />
                  </View>
                  <View className='flex-1'>
                    <Text className='text-base font-semibold text-gray-900'>{rucher.nom}</Text>
                  </View>
                  <View
                    className={`w-10 h-10 rounded-full items-center justify-center ${rucher.pivot?.peut_lire ? "bg-green-100" : "bg-gray-100"}`}
                  >
                    <Ionicons name='eye' size={16} color={rucher.pivot?.peut_lire ? "#10b981" : "#9ca3af"} />
                  </View>
                  <View
                    className={`w-10 h-10 rounded-full items-center justify-center ${rucher.pivot?.peut_modifier ? "bg-green-100" : "bg-gray-100"}`}
                  >
                    <Ionicons name='pencil' size={16} color={rucher.pivot?.peut_modifier ? "#10b981" : "#9ca3af"} />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
