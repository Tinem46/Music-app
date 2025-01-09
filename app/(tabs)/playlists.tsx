import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import className from 'twrnc'
import data from '../../assets/data/library.json'
import ForwardThin from '@/assets/icons/ForwardThin'

const playlists = () => {
  return (
    <View style={className`flex-1 gap-3 bg-black p-4`}>

<View style={className`flex-row justify-between items-center gap-1 p-3`}>
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <View style={className`flex-row justify-between items-center gap-3 p-3`}>
        <Image source={{ uri: item.artwork }} style={className`h-20 w-20 rounded-xl`} />
        <Text style={className`flex-1 text-lg font-bold text-white`}>{item.playlist}</Text>
        <ForwardThin />
      </View>
    )}
    keyExtractor={(item) => item.title}
  />
</View>
    </View>
  )
}

export default playlists