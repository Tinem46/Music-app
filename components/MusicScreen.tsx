import { View, Text, Image, Pressable } from "react-native";
import Slider from "@react-native-community/slider";
import React, { useState, useEffect } from "react";
import className from "twrnc";
import RedHeart from "@/assets/icons/RedHeart";
import Backward from "@/assets/icons/Backward";
import Play from "@/assets/icons/Play";
import Forward from "@/assets/icons/Forward";
import Stop from "@/assets/icons/Stop";

interface MusicScreenProps {
  onpress: () => void;
  selected: any;
  onNextTrack: () => void;
  onPrevTrack: () => void;
}

const MusicScreen: React.FC<MusicScreenProps> = ({ onpress, selected, onNextTrack, onPrevTrack }) => {
  const [playStop, setPlayStop] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackTime, setPlaybackTime] = useState(0);

  const togglePlayStop = () => {
    setPlayStop(!playStop);
  };

  const handleProgressChange = (value: number) => {
    setProgress(value);
    setPlaybackTime(value);
  };

  // To simulate the playback time
  useEffect(() => {
    if (playStop) {
      const interval = setInterval(() => {
        setPlaybackTime((prevTime) => (prevTime + 1) % selected.duration);
        setProgress((prevProgress) => (prevProgress + 1) % 100);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [playStop, selected]);

  if (!selected) return null;

  return (
    <View style={className`absolute top-0 left-0 right-0 bottom-0 bg-black/80 p-5 flex-col justify-center items-center`}>
      {/* Close Button */}
      <Pressable onPress={onpress} style={className`absolute top-5 right-5 bg-gray-800 p-3 rounded-full`}>
        <Text style={className`text-white text-2xl`}>✕</Text>
      </Pressable>

      {/* Artwork */}
      <Image
        source={{ uri: selected.artwork }}
        style={className`h-64 w-64 rounded-xl border-4 border-gray-600 shadow-lg`}
      />

      {/* Song Info */}
      <View style={className`flex-row justify-between items-center w-72 mt-5`}>
        <View>
          <Text style={className`text-xl text-white font-semibold`}>
            {selected.title || "Unknown Title"}
          </Text>
          <Text style={className`text-md text-gray-400`}>
            {selected.artist || "Unknown Artist"}
          </Text>
        </View>
        <RedHeart />
      </View>

      {/* Playback Progress */}
      <View style={className`w-72 mt-4`}>
        <Text style={className`text-white`}>{`${Math.floor(playbackTime / 60)}:${Math.floor(playbackTime % 60)}`}</Text>
        <Slider
          value={progress}
          onValueChange={handleProgressChange}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#1DB954"
          maximumTrackTintColor="#b3b3b3"
          style={className`mt-2`}
        />
        <Text style={className`text-white`}>{`${Math.floor(selected.duration / 60)}:${Math.floor(selected.duration % 60)}`}</Text>
      </View>

      {/* Controls */}
      <View style={className`flex-row justify-center items-center gap-8 mt-6`}>
        <Pressable onPress={onPrevTrack} style={className`text-white`}>
          <Backward />
        </Pressable>
        <Pressable onPress={togglePlayStop} style={className`bg-gray-700 p-4 rounded-full`}>
          {playStop ? (
            <View style={className`text-white`}>
              <Play />
            </View>
          ) : (
            <View style={className`text-white`}>
              <Stop />
            </View>
          )}
        </Pressable>
        <Pressable onPress={onNextTrack} style={className`text-white`}>
          <Forward />
        </Pressable>
      </View>
    </View>
  );
};

export default MusicScreen;
