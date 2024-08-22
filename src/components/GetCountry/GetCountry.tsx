import React, {useEffect, useState} from 'react';
import getAllCountry, {getCountryName} from '../../utils/utils';
import {
  FlatList,
  Image,
  Linking,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {Color, theme} from '../../theme/theme';
import {countryType} from '../../types';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const GetCountry = (): JSX.Element => {
  const [countryData, setCountryData] = useState<[countryType] | []>([]);
  const [countryName, setCountryName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getData() {
    setIsLoading(true);
    const countryData = await getAllCountry();
    setCountryData(countryData);
    setIsLoading(false);
  }
  useEffect(() => {
    getData();
  }, []);

  const searchCountry = async () => {
    if (countryName?.length > 0) {
      setIsLoading(true);
      const fetchedCountryInfo = await getCountryName(countryName);
      setCountryData(fetchedCountryInfo);
      setIsLoading(false);
      setCountryName('');
    } else {
      await getData();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headingContainer}>World Country Information</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Country name"
          value={countryName}
          onChangeText={(text: string) => setCountryName(text)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={searchCountry}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.countryInfoContainer}>
        {isLoading ? (
          <>
            <CountryLoader />
            <CountryLoader />
          </>
        ) : (
          <>
            {countryData?.length > 0 &&
              countryData.map((country: any, index: number) => {
                return (
                  <View key={index} style={styles.countryContainer}>
                    <Image
                      source={{uri: country.flag}}
                      style={styles.countryFlag}
                    />
                    <View style={styles.countryDetails}>
                      <Text style={styles.countryName}>{country.name}</Text>
                      <Text style={styles.countryCapital}>
                        <Text style={styles.heading}>Capital: </Text>
                        {country.capital}
                      </Text>
                      <Text style={styles.countryRegion}>
                        <Text style={styles.heading}>Region: </Text>
                        {country.region}
                      </Text>
                      <Text style={styles.countryPopulation}>
                        <Text style={styles.heading}>Population: </Text>
                        {country.population}
                      </Text>
                      <Text style={styles.countryArea}>
                        <Text style={styles.heading}>Area: </Text>
                        {country.area} km{'\u00B2'}
                      </Text>
                      <TouchableOpacity
                        onPress={() => Linking.openURL(country.map)}>
                        <Text style={styles.mapLink}>Location</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}

            {/* {countryData?.length > 0 && (
              <>
                <FlatList
                  numColumns={1}
                  data={countryData}
                  style={styles.countryInfoContainer}
                  keyExtractor={(country: countryType) => country.name}
                  renderItem={({country}: any): JSX.Element => (
                    <>
                      {country ? (
                        <View style={styles.countryContainer}>
                          <Image
                            source={{uri: country?.flag}}
                            style={styles.countryFlag}
                          />
                          <View style={styles.countryDetails}>
                            <Text style={styles.countryName}>
                              {country.name}
                            </Text>
                            <Text style={styles.countryCapital}>
                              <Text style={styles.heading}>Capital: </Text>
                              {country.capital}
                            </Text>
                            <Text style={styles.countryRegion}>
                              <Text style={styles.heading}>Region: </Text>
                              {country.region}
                            </Text>
                            <Text style={styles.countryPopulation}>
                              <Text style={styles.heading}>Population: </Text>
                              {country.population}
                            </Text>
                            <Text style={styles.countryArea}>
                              <Text style={styles.heading}>Area: </Text>
                              {country.area} km{'\u00B2'}
                            </Text>
                            <TouchableOpacity
                              onPress={() => Linking.openURL(country.map)}>
                              <Text style={styles.mapLink}>Location</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : (
                        <CountryLoader />
                      )}
                    </>
                  )}
                />
              </>
            )} */}

            {countryData?.length === 0 && (
              <Text style={styles.noCountryFound}>No country found</Text>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const CountryLoader = () => {
  return (
    <View style={[styles.countryContainer]}>
      <ShimmerPlaceholder
        style={[styles.countryFlag, styles.countryFlagLoader]}
      />
      <View style={[styles.countryDetails]}>
        <ShimmerPlaceholder
          style={[styles.countryInfoLoader]}></ShimmerPlaceholder>
        <ShimmerPlaceholder
          style={[
            styles.countryInfoLoader,
            styles.countryCaptialLoader,
          ]}></ShimmerPlaceholder>
        <ShimmerPlaceholder
          style={[
            styles.countryInfoLoader,
            styles.countryRegionLoader,
          ]}></ShimmerPlaceholder>
        <ShimmerPlaceholder
          style={[
            styles.countryInfoLoader,
            styles.countryPopulationLoader,
          ]}></ShimmerPlaceholder>
        <ShimmerPlaceholder
          style={[
            styles.countryInfoLoader,
            styles.countryAreaLoader,
          ]}></ShimmerPlaceholder>
        <ShimmerPlaceholder
          style={[
            styles.countryInfoLoader,
            styles.countryMapLoader,
          ]}></ShimmerPlaceholder>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: Color.background,
    padding: 15,
    paddingTop: 20,
    gap: 15,
  },
  headingContainer: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countryInfoContainer: {
    display: 'flex',
    gap: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    padding: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: Color.inputBorder,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '70%',
  },
  buttonContainer: {
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#504ec3',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  countryContainer: {
    flex: 1,
    backgroundColor: Color.background,
    color: Color.text,
    elevation: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    // borderWidth: 1,
    // borderColor: theme == 'dark' && Color.border,
    borderRadius: 10,
    gap: 10,
    width: 350,
  },
  countryDetails: {
    flex: 1,
    gap: 6,
    padding: 10,
  },
  countryFlag: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  countryFlagLoader: {
    backgroundColor: '#e0e0e0', // Gray color for the flag loader
    borderRadius: 4,
    marginRight: 16,
  },
  heading: {
    fontSize: 16,
    color: Color.text,
    fontWeight: 'bold',
  },
  countryName: {
    fontSize: 20,
    color: Color.text,
    fontWeight: 'bold',
  },
  countryCapital: {
    fontSize: 16,
    color: Color.text,
  },
  countryRegion: {
    fontSize: 16,
    color: Color.text,
  },
  countryPopulation: {
    fontSize: 16,
    color: Color.text,
  },
  countryArea: {
    fontSize: 16,
    color: Color.text,
  },
  countryTimezones: {
    fontSize: 16,
    color: Color.text,
  },
  mapLink: {
    fontSize: 16,
    marginBottom: 10,
    color: 'blue',
    textDecorationLine: 'underline',
    textDecorationColor: 'blue',
    textDecorationStyle: 'solid',
    cursor: 'pointer',
  },
  countryInfoLoader: {
    height: 30, // Height of each loading line
    backgroundColor: '#e0e0e0', // Gray color for text loaders
    marginBottom: 10, // Space between lines
    borderRadius: 4, // Rounded corners for a smoother look
    width: '80%',
  },
  countryCaptialLoader: {
    width: '60%',
  },
  countryRegionLoader: {
    width: '50%',
  },
  countryPopulationLoader: {
    width: '70%',
  },
  countryAreaLoader: {
    width: '40%',
  },
  countryMapLoader: {
    width: '30%',
  },
  noCountryFound: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default GetCountry;
