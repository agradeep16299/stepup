import {Image, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts, WeatherImage} from '../../constants';
import {WeatherImagesType} from '../../types/WeatherImagesType';
import {InvalidCity} from '..';
import {WeatherResponse} from '../../types';

const windSpeedIcon = require('../../assets/icons/wind.png');
const humidityIcon = require('../../assets/icons/humidity.png');

interface WeatherCardProps {
  data: WeatherResponse | undefined;
}

const WeatherCard = ({data}: WeatherCardProps) => {
  if (data === undefined) return;
  if (data.cod === '404') return <InvalidCity />;
  return (
    <View style={styles.container}>
      <Image
        source={WeatherImage[data.weather[0].main as keyof WeatherImagesType]}
        style={styles.image}
      />
      <View style={styles.weatherNCityContainer}>
        <Text style={styles.temp}>{Math.round(data.main.temp)}°C</Text>
        <Text style={styles.cityName}>{data.name}</Text>
      </View>
      <View style={styles.weatherDetails}>
        <View style={styles.detailsItemContainer}>
          <Image source={humidityIcon} style={styles.detailImage} />
          <Text style={styles.detailsTxt}>{data.main.humidity}%</Text>
        </View>
        <View style={styles.detailsItemContainer}>
          <Image source={windSpeedIcon} style={styles.detailImage} />
          <Text style={styles.detailsTxt}>{data.wind.speed} km/h</Text>
        </View>
      </View>
    </View>
  );
};

export {WeatherCard};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
  weatherNCityContainer: {
    gap: 10,
    alignItems: 'center',
  },
  temp: {
    fontSize: 26,
    color: Colors.white,
    fontFamily: Fonts.SemiBold,
  },
  cityName: {
    fontSize: 26,
    color: Colors.white,
    fontFamily: Fonts.Regular,
  },
  weatherDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    gap: 10,
  },
  detailsItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailImage: {
    width: 25,
    height: 25,
  },
  detailsTxt: {
    fontSize: 20,
    color: Colors.white,
    fontFamily: Fonts.Bold,
  },
});
