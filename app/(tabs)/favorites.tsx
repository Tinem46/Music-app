import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import className from 'twrnc'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Track from '@/components/Track'
import SearchInput from '@/components/searchInput'
import MusicScreen from '@/components/MusicScreen'

const Favorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const handleTogglePopup = (track: any) => {
    setSelectedTrack(track);
    setPopupVisible(!popupVisible);
  };

  const handleToggleFavorite = async (track: any) => {
    try {
      const newFavorites = favorites.filter(t => t.url !== track.url);
      setFavorites(newFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const filteredFavorites = favorites.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={className`flex-1 gap-2 bg-black p-4`}>
      <SearchInput onSearch={setSearchQuery} />

      <ScrollView>
        <View>
          {filteredFavorites.map((track) => (
            <Track
              key={track.url}
              onpress={() => handleTogglePopup(track)}
              image={{uri: track.artwork}}
              title={track.title}
              name={track.artist}
            />
          ))}
        </View>
      </ScrollView>

      {popupVisible && (
        <MusicScreen
          onpress={() => setPopupVisible(false)}
          selected={selectedTrack}
          onNextTrack={() => {}}
          onPrevTrack={() => {}}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={true}
        />
      )}
    </View>
  )
}

export default Favorites