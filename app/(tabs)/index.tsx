import { View, Text } from "react-native";
import React, { useState } from "react";
import tw from "twrnc"; // Tailwind CSS for React Native
import PlayAndShuffle from "@/components/PlayAndShurffle";
import Track from "@/components/Track";
import Tracks from "@/components/Tracks";
import SearchInput from "@/components/searchInput";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <View style={tw`flex-1 bg-black gap-4`}>
      <SearchInput onSearch={handleSearch} />
      <PlayAndShuffle />
      <Tracks searchQuery={searchQuery} />
    </View>
  );
};

export default Index;
