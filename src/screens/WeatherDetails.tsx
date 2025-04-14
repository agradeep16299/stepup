import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { WeatherResponse } from '../types';

type WeatherDetailsProps = {
  route: RouteProp<{ params: { weatherData: WeatherResponse } }, 'params'>;
};

const WeatherDetails = ({ route }: WeatherDetailsProps) => {
  const { weatherData } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{`${weatherData.name} Weather Details`}</Text>

      <View style={styles.detailItem}>
        <Text style={styles.label}>City:</Text>
        <Text style={styles.value}>{weatherData.name}</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Temperature:</Text>
        <Text style={styles.value}>{weatherData.main.temp}°C</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Pressure:</Text>
        <Text style={styles.value}>{weatherData.main.pressure} PA</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Humidity:</Text>
        <Text style={styles.value}>{weatherData.main.humidity}g.m-3</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Minimun Temprature:</Text>
        <Text style={styles.value}>{weatherData.main.temp_min}°C</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Maximum Temprature:</Text>
        <Text style={styles.value}>{weatherData.main.temp_max}°C</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Weather:</Text>
        <Text style={styles.value}>
          {weatherData.weather[0].main} ({weatherData.weather[0].description})
        </Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Lat:</Text>
        <Text style={styles.value}>
          {weatherData.coord.lat}
        </Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Lon:</Text>
        <Text style={styles.value}>
          {weatherData.coord.lon}
        </Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Sunrise:</Text>
        <Text style={styles.value}>
          {weatherData.sys.sunrise}
        </Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Sunset:</Text>
        <Text style={styles.value}>
          {weatherData.sys.sunset}
        </Text>
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
    marginBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
  },
  value: {
    fontSize: 16,
    color: '#6c757d',
  },
});

export default WeatherDetails;