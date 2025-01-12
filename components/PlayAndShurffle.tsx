import { View, Text, Pressable, Dimensions } from 'react-native';
import React from 'react';
import className from 'twrnc';
import Play from '@/assets/icons/Play';
import Shuffle from '@/assets/icons/Shuffle';
import { musicEventEmitter } from './Tracks';

const PlayAndShuffle = () => {
  const screenWidth = Dimensions.get('window').width;

  const handlePlay = () => {
    musicEventEmitter.emit('play');
  };

  const handleShuffle = () => {
    musicEventEmitter.emit('shuffle');
  };

  return (
    <View style={className`flex-row justify-between items-center px-4`}>
      <Pressable
        onPress={handlePlay}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          backgroundColor: '#2D2D2D',
          borderRadius: 8,
          padding: 10,
          width: screenWidth * 0.4,
        }}>
        <Play />
        <Text style={className`text-lg font-bold text-white`}>Play</Text>
      </Pressable>

      <Pressable
        onPress={handleShuffle}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          backgroundColor: '#2D2D2D',
          borderRadius: 8,
          padding: 10,
          width: screenWidth * 0.4,
        }}>
        <Shuffle />
        <Text style={className`text-lg font-bold text-white`}>Shuffle</Text>
      </Pressable>
    </View>
  );
};

export default PlayAndShuffle;
