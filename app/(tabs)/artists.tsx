import { View, Text, ScrollView, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import data from '../../assets/data/library.json'
import className from 'twrnc'
import SearchInput from '@/components/searchInput'

const Artists = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredData = data.filter(item =>
    item.artist?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={className`flex-1 bg-black p-4`}>
      {/* Search Input */}
      <SearchInput onSearch={handleSearch} />

      
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={className`flex-row items-center py-3 mb-3 px-4 bg-gray-800 rounded-lg shadow-lg`}>
              {/* Artwork */}
              <Image
                source={{ uri: item.artwork }}
                style={className`h-16 w-16 rounded-full border-2 border-gray-600 mr-4`}
              />
              {/* Artist Name */}
              <Text style={className`text-xl text-white font-semibold`}>{item.artist || "Unknown Artist"}</Text>
            </View>
          )}
        />
    
    </View>
  )
}

export default Artists
