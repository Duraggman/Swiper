import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Swiper from 'react-native-swiper'; // Importing Swiper for the image carousel
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Importing gesture handler for handling swipes

const App = () => {
  // Array of images to display in the carousel
  const images = [
    { uri: ('../../assets/images/BB_911.png') },
    { uri: 'https://example.com/image2.jpg' },
    { uri: 'https://example.com/image3.jpg' },
  ];
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Title of the app, centered at the top */}
      <Text style={styles.title}>Swiper App</Text>
      {/* Swiper component to create a horizontal image carousel */}
      <Swiper style={styles.swiper} showsPagination={true}>
        {/* Mapping over images to create a slide for each one */}
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            {/* Image component to display the image */}
            <Image source={image} style={styles.image} resizeMode="contain" />
          </View>
        ))}
      </Swiper>
    </GestureHandlerRootView>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1, // Allows the container to take up the full height
    justifyContent: 'flex-start', // Aligns children to the top of the container
    alignItems: 'center', // Centers children horizontally
    backgroundColor: '#fff', // Background color of the container
  },
  title: {
    fontSize: 24, // Font size of the title
    fontWeight: 'bold', // Bold font for the title
    marginTop: 20, // Space above the title
  },
  swiper: {
    height: 300, // Height of the swiper component
    width: '100%', // Full width of the container
  },
  slide: {
    flex: 1, // Takes up full space of the swiper
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  image: {
    width: '100%', // Image will take full width of the slide
    height: '100%', // Image will take full height of the slide
  },
});

export default App; // Exporting the App component