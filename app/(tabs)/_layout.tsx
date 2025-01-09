import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import ClassName from "twrnc";
import Heart from "@/assets/icons/Heart";
import Playlist from "@/assets/icons/Playlist";
import Music from "@/assets/icons/Music";
import Artists from "@/assets/icons/Artists";
import SearchInput from "@/components/searchInput";
const Layout = () => {
  return (
    <View style={ClassName`flex-1 p-2 bg-black`}>
        
      <Tabs 
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "grey",
            height: 70,
            margin: 15,
            borderRadius: 20,
            borderWidth: 1,
          },
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 40,
            color: "white",
          },
          tabBarLabelStyle: {
            color: "white",
            padding: 5,
          },
          tabBarActiveTintColor: "white",
        }}
      >
        <Tabs.Screen
          name="favorites"
          options={{
            tabBarIcon: () => <Heart />,
            headerTitle: "Favorites",
            tabBarLabel: "Favorites",
          }}
        />
        <Tabs.Screen
          name="playlists"
          options={{
            tabBarIcon: () => <Playlist />,
            headerTitle: "Playlists",
            tabBarLabel: "Playlists",
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: () => <Music />,
            headerTitle: "Songs",
            tabBarLabel: "Songs",
          }}
        />
        <Tabs.Screen
          name="artists"
          options={{
            tabBarIcon: () => <Artists />,
            headerTitle: "Artists",
            tabBarLabel: "Artists",
          }}
        />
      </Tabs>
    </View>
  );
};

export default Layout;
