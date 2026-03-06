import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface Actions {
  icon: React.ReactNode;
  onPress: () => void;
}

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
  actions?: Actions[];
  loading?: boolean;
}

export default function FloatingActionButton({
  actions,
  onPress,
  icon = "add",
  size = 62,
  loading = false,
  backgroundColor = "#059669",
  iconColor = "white",
}: FloatingActionButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <View className='bg-transparent absolute bottom-7 right-6 z-50 flex flex-row items-center justify-center h-[85px]'>
      {actions && actions.length > 0 && (
        <View
          className='flex flex-row gap-3 bg-white pr-7 mr-[-15px] py-4 pl-4 rounded-l-3xl border border-slate-200'
          style={{
            shadowColor: "#0F172A",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.08,
            shadowRadius: 18,
            elevation: 3,
          }}
        >
          {/* <Pressable onPress={() => {}} className='active:scale-95 px-2'>
            <Ionicons name='accessibility' size={24} color='gray' />
          </Pressable> */}
          {actions.map((action, index) => (
            <Pressable key={index} onPress={action.onPress} className='active:scale-95 px-2'>
              {action.icon}
            </Pressable>
          ))}
        </View>
      )}
      <Animated.View
        className='rounded-full p-4'
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            shadowColor: "#065F46",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.28,
            shadowRadius: 16,
            elevation: 6,
            zIndex: 1000,
          },
          animatedStyle,
        ]}
      >
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={loading}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: size / 2,
          }}
        >
          {loading ? (
            <ActivityIndicator size='small' color={iconColor} className='w-10 h-10' />
          ) : (
            <Ionicons name={icon} size={size * 0.5} color={iconColor} />
          )}
        </Pressable>
      </Animated.View>
    </View>
  );

  // return (
  //   <Animated.View
  //     style={[
  //       {
  //         position: "absolute",
  //         bottom: 20,
  //         right: 20,
  //         width: size,
  //         height: size,
  //         borderRadius: size / 2,
  //         backgroundColor,
  //         shadowColor: "#000",
  //         shadowOffset: {
  //           width: 0,
  //           height: 4,
  //         },
  //         shadowOpacity: 0.3,
  //         shadowRadius: 8,
  //         elevation: 8,
  //         zIndex: 1000,
  //       },
  //       animatedStyle,
  //     ]}
  //   >
  //     <Pressable
  //       onPress={onPress}
  //       onPressIn={handlePressIn}
  //       onPressOut={handlePressOut}
  //       style={{
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         borderRadius: size / 2,
  //       }}
  //     >
  //       <Ionicons name={icon} size={size * 0.5} color={iconColor} />
  //     </Pressable>
  //   </Animated.View>
  // );
}
