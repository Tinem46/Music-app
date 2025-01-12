import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import className from 'twrnc'
import { useLocalSearchParams, router } from 'expo-router'

const ArtistDetails = () => {
  const { artistName, songs } = useLocalSearchParams()
  const parsedSongs = JSON.parse(songs as string)

  return (
    <View style={className`flex-1 bg-black p-4`}>
      <View style={className`flex-row items-center mb-4`}>
        <TouchableOpacity 
          onPress={() => router.replace('/(tabs)/artists')}
          style={className`mr-4`}
        >
          <Text style={className`text-white text-xl`}>←</Text>
        </TouchableOpacity>
        <Text style={className`text-2xl font-bold text-white`}>{artistName}</Text>
      </View>
      <FlatList
        data={parsedSongs}
        renderItem={({ item }) => (
          <View style={className`flex-row items-center gap-3 p-3`}>
            <Image 
              source={{ uri: item.artwork || 'default_song_image_url' }} 
              style={className`h-12 w-12 rounded-lg`} 
            />
            <View>
              <Text style={className`text-white font-medium`}>{item.title}</Text>
              <Text style={className`text-gray-400`}>{item.artist}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.url}
      />
    </View>
  )
}

export default ArtistDetails 