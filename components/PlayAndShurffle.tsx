import { View, Text, Pressable, Dimensions } from 'react-native';
import React from 'react';
import className from 'twrnc';
import Play from '@/assets/icons/Play';
import Shuffle from '@/assets/icons/Shuffle';

const PlayAndShuffle = () => {
  // Lấy chiều rộng của màn hình
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={className`flex-row justify-between items-center px-4`}>
      {/* Nút Play */}
      <Pressable
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12, // khoảng cách giữa icon và text
          backgroundColor: '#2D2D2D',
          borderRadius: 8,
          padding: 10,
          width: screenWidth * 0.4, // 40% chiều rộng màn hình
        }}>
        <Play />
        <Text style={className`text-lg font-bold text-white`}>Play</Text>
      </Pressable>

      {/* Nút Shuffle */}
      <Pressable
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12, // khoảng cách giữa icon và text
          backgroundColor: '#2D2D2D',
          borderRadius: 8,
          padding: 10,
          width: screenWidth * 0.4, // 40% chiều rộng màn hình
        }}>
        <Shuffle />
        <Text style={className`text-lg font-bold text-white`}>Shuffle</Text>
      </Pressable>
    </View>
  );
};

export default PlayAndShuffle;
