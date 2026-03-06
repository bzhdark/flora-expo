import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useRef } from "react";
import { Animated, Dimensions, ImageBackground, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: screenWidth } = Dimensions.get("window");
const HEADER_HEIGHT = screenWidth * (9 / 16); // Format 16:9

interface ParallaxHeaderScrollViewProps {
  backgroundImagePath: any; // Pour accepter require() ou { uri: string }
  title: string;
  children: React.ReactNode;
  onScroll?: (event: any) => void;
  onEndOfListReached?: () => void;
  endOfListThreshold?: number;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function ParallaxHeaderScrollView({
  backgroundImagePath,
  title,
  children,
  onScroll,
  onEndOfListReached,
  endOfListThreshold = 200,
  onRefresh,
  isRefreshing,
}: ParallaxHeaderScrollViewProps) {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const hasTriggeredEndReached = useRef(false);

  const handleScroll = useCallback(
    (event: any) => {
      // Call the original onScroll if provided
      if (onScroll) {
        onScroll(event);
      }

      // Handle end of list detection
      if (onEndOfListReached) {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const { y: scrollY } = contentOffset;
        const { height: contentHeight } = contentSize;
        const { height: layoutHeight } = layoutMeasurement;

        // Calculate distance from end
        const distanceFromEnd = contentHeight - scrollY - layoutHeight;

        if (distanceFromEnd < endOfListThreshold && !hasTriggeredEndReached.current) {
          hasTriggeredEndReached.current = true;
          onEndOfListReached();
        }

        // Reset the flag when scrolling back up
        if (distanceFromEnd > endOfListThreshold * 2) {
          hasTriggeredEndReached.current = false;
        }
      }
    },
    [onScroll, onEndOfListReached, endOfListThreshold]
  );

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT, 0],
    extrapolate: "clamp",
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT / 2],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2],
    outputRange: [1, 0.3],
    extrapolate: "clamp",
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  const barOpacity = scrollY.interpolate({
    inputRange: [HEADER_HEIGHT - 50, HEADER_HEIGHT],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const barTranslateY = scrollY.interpolate({
    inputRange: [HEADER_HEIGHT - 50, HEADER_HEIGHT],
    outputRange: [-60, 0],
    extrapolate: "clamp",
  });

  return (
    <View className='flex-1'>
      {/* Hero Header avec effet parallax */}
      <Animated.View
        style={{
          height: headerHeight,
          overflow: "hidden",
        }}
        className='absolute top-0 left-0 right-0 z-10'
      >
        <Animated.View
          style={{
            transform: [{ translateY: imageTranslateY }],
            opacity: imageOpacity,
          }}
        >
          <ImageBackground
            source={backgroundImagePath}
            style={{
              width: screenWidth,
              height: HEADER_HEIGHT,
            }}
            resizeMode='cover'
          >
            <View className='flex-1 justify-between items-start bg-black/30'>
              <SafeAreaView edges={["top"]} className='bg-transparent px-4 py-1'>
                <TouchableOpacity
                  onPress={() => router.back()}
                  className='w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg'
                  style={{ elevation: 5 }}
                >
                  <Ionicons name='arrow-back' size={20} color='#000' />
                </TouchableOpacity>
              </SafeAreaView>
              <Animated.Text
                style={{
                  transform: [{ scale: titleScale }],
                }}
                numberOfLines={2}
                ellipsizeMode='tail'
                className='text-white text-3xl font-bold text-left px-4 mb-5 ml-2'
              >
                {title}
              </Animated.Text>
            </View>
          </ImageBackground>
        </Animated.View>
      </Animated.View>

      {/* Barre horizontale qui apparaît lors du scroll */}
      <Animated.View
        style={{
          opacity: barOpacity,
          transform: [{ translateY: barTranslateY }],
        }}
        className='absolute top-0 left-0 right-0 z-30 bg-white android:shadow-lg ios:shadow'
      >
        <SafeAreaView edges={["top"]} className='flex-row items-center justify-between px-4 py-3 gap-3'>
          <TouchableOpacity
            onPress={() => router.back()}
            className='w-10 h-10 bg-gray-100 rounded-full items-center justify-center'
          >
            <Ionicons name='arrow-back' size={18} color='#000' />
          </TouchableOpacity>

          <Text className='text-xl font-semibold text-gray-700 flex-1' numberOfLines={1} ellipsizeMode='tail'>
            {title}
          </Text>
        </SafeAreaView>
      </Animated.View>

      {/* Contenu scrollable */}
      <Animated.ScrollView
        className='flex-1'
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
          listener: handleScroll,
        })}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing === true}
            onRefresh={() => {
              console.log("onRefresh");
            }}
          />
        }
        // refreshControl={
        //   onRefresh !== undefined && isRefreshing !== undefined ? (
        //     <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        //   ) : undefined
        // }
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
}

export { HEADER_HEIGHT };
