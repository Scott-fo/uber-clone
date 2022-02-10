import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setDestination, setOrigin } from '../slices/navSlice';

const data = [
    {
        id: "123",
        icon: "home",
        location: "Home",
        destination: "Code Street, London, UK",
        coords: {
            "lat": 51.522392,
            "lng": -0.07083420000000001,
        }
    },
    {
        id: "456",
        icon: "briefcase",
        location: "Work",
        destination: "London Eye, London, UK",
        coords: {
            "lat": 51.5032973,
            "lng": -0.1195537,
        }
    },
    
]
const NavFavourites = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    
    function handlePress(coords, destination) {
        if(!origin) {
            dispatch(setOrigin({
                location: coords,
                description: destination,
            }))
            navigation.navigate("MapScreen")
        } else {
            dispatch(setDestination({
                location: coords,
                description: destination,
            }))
        }
    }

  return (
    <FlatList 
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
            <View
                style={[tw`bg-gray-200`, { height: 0.5 }]}
            />
        )}
        renderItem={({item: { location, destination, icon, coords }}) => (
            <TouchableOpacity style={tw`flex-row items-center p-5`} onPress={() => handlePress(coords, destination)}>
                <Icon 
                    style={tw`mr-4 rounded-full bg-black p-3`}
                    name={icon}
                    type="ionicon"
                    color="white"
                    size={18}

                />
                <View>
                    <Text style={tw`font-semibold text-lg`}>{location}</Text>
                    <Text style={tw`text-gray-500`}>{destination}</Text>
                    
                </View>
            </TouchableOpacity>
        )}
    />
  )
}

export default NavFavourites

const styles = StyleSheet.create({})