import { Ionicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import React, { useState } from "react";
import {
  ActionSheetIOS,
  Modal,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";

export interface HeaderMenuItem {
  label: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

interface HeaderMenuProps {
  items: HeaderMenuItem[];
  icon?: keyof typeof Ionicons.glyphMap;
  className?: string;
}

export default function HeaderMenu({
  items,
  icon = "ellipsis-vertical",
  className,
}: HeaderMenuProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const openMenu = () => {
    if (Platform.OS === "ios" && items.length > 0) {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Annuler", ...items.map((i) => i.label)],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex > 0) {
            items[buttonIndex - 1].onPress();
          }
        }
      );
    } else {
      setModalVisible(true);
    }
  };

  const handleItemPress = (item: HeaderMenuItem) => {
    setModalVisible(false);
    item.onPress();
  };

  if (Platform.OS === "android") {
    return (
      <>
        <Pressable
          onPress={openMenu}
          className={clsx(
            "h-10 w-10 items-center justify-center rounded-full",
            "bg-gray-100 active:bg-gray-200",
            className
          )}
        >
          <Ionicons name={icon} size={22} color="#374151" />
        </Pressable>
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable
            className="flex-1 justify-end bg-black/50"
            onPress={() => setModalVisible(false)}
          >
            <Pressable
              className="rounded-t-2xl bg-white pb-safe"
              onPress={(e) => e.stopPropagation()}
            >
              <View className="border-t border-gray-200 px-2 py-2">
                {items.map((item) => (
                  <Pressable
                    key={item.label}
                    onPress={() => handleItemPress(item)}
                    className="flex-row items-center gap-3 rounded-lg px-4 py-3 active:bg-gray-100"
                  >
                    {item.icon && (
                      <Ionicons name={item.icon} size={22} color="#374151" />
                    )}
                    <Text className="text-base font-medium text-gray-800">
                      {item.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </>
    );
  }

  return (
    <Pressable
      onPress={openMenu}
      className={clsx("h-10 w-10 items-center justify-center", className)}
    >
      <Ionicons name={icon} size={24} color="#374151" />
    </Pressable>
  );
}
