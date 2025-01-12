import { View, FlatList, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Track from "./Track";
import data from "../assets/data/library.json";
import className from "twrnc";
import MusicScreen from "./MusicScreen";
import { Audio } from 'expo-av';
import { EventEmitter } from 'events';

interface TracksProps {
  searchQuery: string; 
}

export const musicEventEmitter = new EventEmitter();

const Tracks: React.FC<TracksProps> = ({ searchQuery }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekPosition, setSeekPosition] = useState(0);

  useEffect(() => {
    const initAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };
    
    initAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    const handlePlay = () => {
      if (selectedTrack) {
        togglePlayback();
      } else {
        handleTogglePopup(data[0]);
      }
    };

    const handleShuffle = () => {
      const randomIndex = Math.floor(Math.random() * data.length);
      setCurrentTrackIndex(randomIndex);
      handleTogglePopup(data[randomIndex]);
    };

    musicEventEmitter.on('play', handlePlay);
    musicEventEmitter.on('shuffle', handleShuffle);

    return () => {
      musicEventEmitter.off('play', handlePlay);
      musicEventEmitter.off('shuffle', handleShuffle);
    };
  }, [selectedTrack, data]);

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded && !isSeeking) {
      setPlaybackTime(status.positionMillis / 1000);
      setProgress((status.positionMillis / status.durationMillis) * 100);
      if (status.didJustFinish) {
        setIsPlaying(false);
        handleNextTrack();
      }
    }
  };

  const handleTogglePopup = async (item: any) => {
    try {
      setIsLoading(true);
      console.log('Loading track:', item.url);
      
      if (popupVisible) {
        if (sound) {
          await sound.stopAsync();
          await sound.unloadAsync();
          setSound(null);
          setIsPlaying(false);
        }
        setSelectedTrack(null);
        setPopupVisible(false);
        return;
      }

      // Nếu mở popup với track mới
      if (selectedTrack?.url !== item.url) {
        if (sound) {
          await sound.stopAsync();
          await sound.unloadAsync();
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: item.url },
          { 
            shouldPlay: true,
            progressUpdateIntervalMillis: 100,
            positionMillis: 0,
            volume: 1.0,
            rate: 1.0,
            androidImplementation: 'MediaPlayer',
          },
          onPlaybackStatusUpdate
        );
        setSound(newSound);
        setIsPlaying(true);
      }
      setSelectedTrack(item);
      setPopupVisible(true);
    } catch (error) {
      console.error('Error handling popup:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayback = async () => {
    if (!sound) return;
    
    try {
      const status = await sound.getStatusAsync();
      if (!status.isLoaded) {
        console.log('Sound is not loaded yet');
        return;
      }

      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  const handleProgressChange = (value: number) => {
    if (!sound) return;
    setProgress(value);
    setSeekPosition(value);
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekComplete = async () => {
    if (!sound) return;
    
    try {
      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.durationMillis) {
        const newPosition = (seekPosition / 100) * status.durationMillis;
        await sound.setPositionAsync(newPosition);
      }
    } catch (error) {
      console.error('Error setting position:', error);
    } finally {
      setIsSeeking(false);
    }
  };

  const handleNextTrack = async () => {
    if (currentTrackIndex < data.length - 1) {
      setIsLoading(true);
      try {
        if (sound) {
          await sound.stopAsync();
          await sound.unloadAsync();
        }
        
        const nextTrack = data[currentTrackIndex + 1];
        setCurrentTrackIndex(currentTrackIndex + 1);
        setSelectedTrack(nextTrack);
        
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: nextTrack.url },
          { 
            shouldPlay: true,
            progressUpdateIntervalMillis: 100,
            androidImplementation: 'MediaPlayer',
            preloadConfig: {
              preferredBufferSize: 250000
            }
          },
          onPlaybackStatusUpdate
        );
        setSound(newSound);
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing next track:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePrevTrack = async () => {
    if (currentTrackIndex > 0) {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }
      
      const prevTrack = data[currentTrackIndex - 1];
      setCurrentTrackIndex(currentTrackIndex - 1);
      setSelectedTrack(prevTrack);
      
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: prevTrack.url },
          { shouldPlay: true },
          onPlaybackStatusUpdate
        );
        setSound(newSound);
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing previous track:', error);
      }
    }
  };

  const filteredData = data.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  return (
    <View style={className`flex-1 bg-black`}>
      {/* Track List */}
      
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <Track
              onpress={() => handleTogglePopup(item)}
              image={{ uri: item.artwork }}
              title={item.title || "Unknown Title"}
              name={item.artist || "Unknown Artist"}
            />
          )}
        />

      {/* Popup */}
      {selectedTrack && (
        <MusicScreen
          onpress={() => setPopupVisible(false)}
          selected={selectedTrack}
          onNextTrack={handleNextTrack}
          onPrevTrack={handlePrevTrack}
          isPlaying={isPlaying}
          onTogglePlayback={togglePlayback}
          progress={progress}
          playbackTime={playbackTime}
          onProgressChange={handleProgressChange}
          onSeekStart={handleSeekStart}
          onSeekComplete={handleSeekComplete}
          visible={popupVisible}
          isFavorite={false}
          onToggleFavorite={() => {}}
        />
      )}
    </View>
  );
};

export default Tracks;
