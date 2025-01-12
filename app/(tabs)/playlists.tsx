import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import className from 'twrnc'
import data from '../../assets/data/library.json'
import ForwardThin from '@/assets/icons/ForwardThin'
import { router } from 'expo-router'

const playlists = () => {
  // Tạo danh sách playlist duy nhất và đếm số lượng bài hát
  const playlistsData = useMemo(() => {
    const playlists = new Map()
    
    data.forEach(song => {
      if (song.playlist) {
        song.playlist.forEach(playlistName => {
          if (!playlists.has(playlistName)) {
            playlists.set(playlistName, {
              name: playlistName,
              count: 1,
              artwork: song.artwork // Lấy artwork đầu tiên làm ảnh đại diện
            })
          } else {
            const playlist = playlists.get(playlistName)
            playlist.count += 1
          }
        })
      }
    })
    
    return Array.from(playlists.values())
  }, [])

  return (
    <View style={className`flex-1 bg-black p-4`}>
      <FlatList
        data={playlistsData}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={className`flex-row justify-between items-center gap-3 p-3`}
            activeOpacity={0.7}
            onPress={() => router.push({
              pathname: '/screens/PlaylistDetails',
              params: {
                playlistName: item.name,
                songs: JSON.stringify(data.filter(song => 
                  song.playlist?.includes(item.name)
                ))
              }
            })}
          >
            <Image 
              source={{ uri: item.artwork || 'default_playlist_image_url' }} 
              style={className`h-20 w-20 rounded-xl`} 
            />
            <View style={className`flex-1`}>
              <Text style={className`text-lg font-bold text-white`}>{item.name}</Text>
              <Text style={className`text-sm text-gray-400`}>{item.count} songs</Text>
            </View>
            <ForwardThin />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  )
}

export default playlists