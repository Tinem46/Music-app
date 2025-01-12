import { View, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useMemo } from 'react'
import data from '../../assets/data/library.json'
import className from 'twrnc'
import SearchInput from '@/components/searchInput'
import ForwardThin from '@/assets/icons/ForwardThin'
import { router } from 'expo-router'

const Artists = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Create unique artists list with song counts
  const artistsData = useMemo(() => {
    const artists = new Map()
    
    data.forEach(song => {
      if (song.artist) {
        if (!artists.has(song.artist)) {
          artists.set(song.artist, {
            name: song.artist,
            count: 1,
            artwork: song.artwork
          })
        } else {
          const artist = artists.get(song.artist)
          artist.count += 1
        }
      }
    })
    
    return Array.from(artists.values())
  }, [])

  const filteredData = artistsData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={className`flex-1 bg-black p-4`}>
      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search artists..."
      />
      
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={className`flex-row justify-between items-center gap-3 p-3`}
            activeOpacity={0.7}
            onPress={() => router.push({
              pathname: '/screens/ArtistDetails',
              params: {
                artistName: item.name,
                songs: JSON.stringify(data.filter(song => 
                  song.artist === item.name
                ))
              }
            })}
          >
            <Image
              source={{ uri: item.artwork || 'default_artist_image_url' }}
              style={className`h-20 w-20 rounded-full border-2 border-gray-600`}
            />
            <View style={className`flex-1`}>
              <Text style={className`text-lg font-bold text-white`}>{item.name}</Text>
              <Text style={className`text-sm text-gray-400`}>{item.count} songs</Text>
            </View>
            <ForwardThin />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Artists
