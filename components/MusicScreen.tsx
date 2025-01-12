import { Audio } from 'expo-av';
import { View, Text, Image, Pressable } from "react-native";
import Slider from "@react-native-community/slider";
import React, { useState, useEffect } from "react";
import className from "twrnc";
import RedHeart from "@/assets/icons/RedHeart";
import WhiteHeart from "../assets/icons/WhiteHeart";
import Backward from "@/assets/icons/Backward";
import Play from "@/assets/icons/Play";
import Forward from "@/assets/icons/Forward";
import Stop from "@/assets/icons/Stop";

interface MusicScreenProps {
  onpress: () => void;
  selected: any;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  isPlaying: boolean;
  onTogglePlayback: () => void;
  progress: number;
  playbackTime: number;
  onProgressChange: (value: number) => void;
  visible: boolean;
  onSeekStart: () => void;
  onSeekComplete: () => void;
  isFavorite: boolean;
  onToggleFavorite: (track: any) => void;
}

const MusicScreen: React.FC<MusicScreenProps> = ({
  onpress,
  selected,
  onNextTrack,
  onPrevTrack,
  isPlaying,
  onTogglePlayback,
  progress,
  playbackTime,
  onProgressChange,
  visible,
  onSeekStart,
  onSeekComplete,
  isFavorite,
  onToggleFavorite
}) => {
  if (!selected || !visible) return null;

  return (
    <View style={className`absolute top-0 left-0 right-0 bottom-0 bg-black/80 px-4 py-8 flex-col justify-between`}>
      {/* Close Button */}
      <Pressable onPress={onpress} style={className`absolute top-8 right-4 bg-gray-800 p-3 rounded-full z-10`}>
        <Text style={className`text-white text-xl`}>✕</Text>
      </Pressable>

      {/* Main Content Container */}
      <View style={className`flex-1 justify-center items-center gap-6`}>
        {/* Artwork */}
        <Image
          source={{ uri: selected.artwork }}
          style={className`w-[65%] aspect-square rounded-xl border-4 border-gray-600 shadow-lg`}
        />

        {/* Song Info */}
        <View style={className`w-[80%] flex-row justify-between items-center`}>
          <View style={className`flex-1 pr-4`}>
            <Text numberOfLines={1} style={className`text-xl text-white font-semibold`}>
              {selected.title || "Unknown Title"}
            </Text>
            <Text numberOfLines={1} style={className`text-md text-gray-400`}>
              {selected.artist || "Unknown Artist"}
            </Text>
          </View>
          <Pressable onPress={() => {
            onToggleFavorite(selected);
          }}>
            {isFavorite ? <RedHeart /> : <WhiteHeart />}
          </Pressable>
        </View>

        {/* Playback Controls Container */}
        <View style={className`w-[80%]`}>
          {/* Progress Bar */}
          <View style={className`flex-row justify-between items-center`}>
            <Text style={className`text-white text-sm`}>
              {`${Math.floor(playbackTime / 60)}:${String(Math.floor(playbackTime % 60)).padStart(2, '0')}`}
            </Text>
            <Text style={className`text-white text-sm`}>
              {`${Math.floor(selected.duration / 60)}:${String(Math.floor(selected.duration % 60)).padStart(2, '0')}`}
            </Text>
          </View>
          <Slider
            value={progress}
            onValueChange={onProgressChange}
            onSlidingStart={onSeekStart}
            onSlidingComplete={onSeekComplete}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#1DB954"
            maximumTrackTintColor="#b3b3b3"
            style={className`my-2`}
          />

          {/* Controls */}
          <View style={className`flex-row justify-center items-center gap-8 mt-4`}>
            <Pressable onPress={onPrevTrack}>
              <Backward />
            </Pressable>
            <Pressable onPress={onTogglePlayback} style={className`bg-gray-700 p-4 rounded-full`}>
              {!isPlaying ? <Play /> : <Stop />}
            </Pressable>
            <Pressable onPress={onNextTrack}>
              <Forward />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MusicScreen;
