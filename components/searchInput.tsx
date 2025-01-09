import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Search from "@/assets/icons/Search";

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (text) => {
    setQuery(text);
    onSearch(text);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={tw`bg-gray-800  rounded-lg flex-row justify-start items-center px-3 gap-2 w-100`}
      >
        <Search />
        <TextInput
          placeholder="Find in songs"
          style={tw`text-lg flex-1 p-3 text-gray-300 rounded-lg`}
          value={query}
          onChangeText={handleSearch}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchInput;
