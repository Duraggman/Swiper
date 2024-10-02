import React from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper'; // Ensure this library is installed

const App = () => {
  const images = [
    require('../../assets/images/BB_911.png'), // Local image
    require('../../assets/images/cinemaImg.png'), // Local image
    require('../../assets/images/stayInImg.png'), // Local image
  ];

  return (
    <View style={styles.outerContainer}>
      <GestureHandlerRootView style={styles.container}>
        <Swiper
          style={styles.swiper}
          showsPagination={false} // Hide the default pagination
        >
          {images.map((image, index) => (
            <View key={index} style={styles.maroonSlide}>
              {/* Displaying the image in the swiper */}
              <Image
                source={image} // Directly use the image source
                style={styles.image} // Image styles for consistency
                resizeMode='stretch'// Ensures the image is fully visible without stretching
              />
            </View>
          ))}
        </Swiper>
        <View style={styles.btnContainer}>
            <Button
              title="Get Started"
            />
          </View>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    opacity: 1, // Optional opacity
    backgroundColor: 'pink', // Example: Container background color
  },
  container: {
    flex: 1,
  },
  swiper: {
    height: '100%', // Full height of the container
  },
  maroonSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Take full width of the screen
    height: '100%', // Take full height of the screen
    backgroundColor: 'transparent', // Transparent background
  },
  image: {
    width: '100%', // Ensure image takes a percentage of the container
    height: '100%', // Set to a percentage to fill the height of the container
    maxHeight: '80%', // Optional: limit height to allow some space around the image
    maxWidth: '80%', // Ensure image width does not exceed container
    borderWidth: 2, // Width of the border
    borderColor: 'black', // Color of the border
    borderRadius: 10, // Rounded corners (optional)
    marginBottom: 70, // Optional padding to ensure the image is not too close to the border
    paddingHorizontal: 70, // Optional horizontal margin
  },
  btnContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
});

export default App;
