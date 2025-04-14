import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherResponse } from '../types';
import { DAL } from '../api/DAL';
import { Endpoints } from '../constants';
import { useDispatch } from 'react-redux';
import { setWeathersData } from '../reducers/slices/weatherSlice';
import OverlayLoader from '../components/OverlayLoader';

type City = {
  id: string;
  name: string;
};

const AddDetails = (props: any) => {
  const dispatch = useDispatch();
  const [cityName, setCityName] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCityName, setSelectedCityName] = useState('');



  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherResponse | undefined>();
  useEffect(() => {
    const loadCities = async () => {
      try {
        const savedCities = await AsyncStorage.getItem('cities');
        if (savedCities) {
          setCities(JSON.parse(savedCities));
        }
      } catch (error) {
        console.error('Failed to load cities', error);
      }
    };
    loadCities();
  }, []);

  useEffect(() => {
    const saveCities = async () => {
      try {
        await AsyncStorage.setItem('cities', JSON.stringify(cities));
      } catch (error) {
        console.error('Failed to save cities', error);
      }
    };
    saveCities();
  }, [cities]);

  const handleAddCity = () => {
    const trimmedName = cityName.trim();

    if (!trimmedName) {
      Alert.alert('Error', 'City name cannot be empty');
      return;
    }


    const cityExists = cities.some(
      city => city.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (cityExists) {
      Alert.alert('Duplicate City', `"${trimmedName}" already exists in the list`);
      return;
    }

    const newCity = {
      id: Date.now().toString(),
      name: trimmedName,
    };

    setCities([...cities, newCity]);
    setCityName('');
    setSelectedCity(newCity.id);
    setSelectedCityName(newCity.name)

    Alert.alert('Success', `"${trimmedName}" has been added successfully`);
  };

  const handleOnPress = async () => {
    if (!selectedCityName) {
      Alert.alert("Error", "Please select a city first");
      return;
    }
  
    setIsLoading(true);
    try {
      const result = await DAL.GET(Endpoints.weather, selectedCityName);
      if (result?.name) {
        setWeatherData(result);
        dispatch(setWeathersData(result));
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        props.navigation.navigate("WeatherDetails", {
          weatherData: result
        });
       

      } else {
        Alert.alert("Error", "Invalid city name or no data found");
        setIsLoading(false);

      }
    } catch (error) {
      console.error('Error: ', error);
      Alert.alert("Error", "Failed to fetch weather data");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>City Management</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter City Name:</Text>
        <TextInput
          style={styles.input}
          value={cityName}
          onChangeText={setCityName}
          placeholder="Type city name"
          onSubmitEditing={handleAddCity}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddCity}>
          <Text style={styles.buttonText}>Add City</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select City:</Text>
        <Picker
          selectedValue={selectedCity}
          onValueChange={(itemValue) => {
            setSelectedCity(itemValue);
            const selected = cities.find(c => c.id === itemValue);
            setSelectedCityName(selected?.name || "");
          }}
          style={styles.picker}>
          <Picker.Item label="Select a city" value="" />
          {cities.map((city) => (
            <Picker.Item
              key={city.id}
              label={city.name}
              value={city.id}
            />
          ))}
        </Picker>
      </View>

      {selectedCity && (
        <TouchableOpacity style={styles.selectedContainer}
          onPress={handleOnPress}
          activeOpacity={0.9}
        >
          <Text style={styles.selectedText}>
             { `Weather Of ${cities.find(c => c.id === selectedCity)?.name}`}
          </Text>
        </TouchableOpacity>
      )}

      <Text style={styles.countText}>
        {cities.length} {cities.length === 1 ? 'city' : 'cities'} available
      </Text>
      <OverlayLoader visible={isLoading} /> 
    </ScrollView>
  );
};


export default AddDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40',
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#495057',
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  picker: {
    height: 60,
    width: '100%',
    backgroundColor: '#C44C30',
    borderRadius: 10
  },
  selectedContainer: {
    backgroundColor:  "#2f95dc",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  selectedText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  countText: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 14,
  },
});

