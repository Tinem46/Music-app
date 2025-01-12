
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PlaylistDetails from '../screens/PlaylistDetails'
import ArtistDetails from '../screens/ArtistDetails'

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="PlaylistDetails" 
        component={PlaylistDetails}
        options={{
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
      <Stack.Screen 
        name="ArtistDetails" 
        component={ArtistDetails}
        options={{
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  )
}

export default AppNavigator 