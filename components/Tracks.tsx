import { View, FlatList, ScrollView } from "react-native";
import React, { useState } from "react";
import Track from "./Track";
import data from "../assets/data/library.json";
import className from "twrnc";
import MusicScreen from "./MusicScreen";

// Define the TracksProps interface
interface TracksProps {
  searchQuery: string; // Add the searchQuery prop
}

const Tracks: React.FC<TracksProps> = ({ searchQuery }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const handleTogglePopup = (item: any) => {
    setPopupVisible(!popupVisible);
    setSelectedTrack(item);
  };

  const handleNextTrack = () => {
    if (currentTrackIndex < data.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      setSelectedTrack(data[currentTrackIndex + 1]);
    }
  };

  const handlePrevTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
      setSelectedTrack(data[currentTrackIndex - 1]);
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
      {popupVisible && (
        <MusicScreen
          onpress={() => setPopupVisible(false)}
          selected={selectedTrack}
          onNextTrack={handleNextTrack}
          onPrevTrack={handlePrevTrack}
        />
      )}
    </View>
  );
};

export default Tracks;
