import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import className from 'twrnc'

import Track from '@/components/Track'
import data from '../../assets/data/library.json'
import SearchInput from '@/components/searchInput'
import PlayAndShuffle from '@/components/PlayAndShurffle'

const favorites = () => {
  return (
    <View style={className`flex-1 gap-2 bg-black p-4`}>
      <SearchInput/>

      <ScrollView>
        <View>
          <Track image={{uri: data[0].artwork}} title={data[0].title} name={data[0].artist}/>
          <Track image={{uri:data[3].artwork}} title={data[3].title} name={data[3].artist}/>
          <Track image={{uri:data[6].artwork}} title={data[6].title} name={data[6].artist}/>
          <Track image={{uri:data[9].artwork}} title={data[9].title} name={data[9].artist}/>
        </View>
      </ScrollView>
    </View>
  )
}

export default favorites