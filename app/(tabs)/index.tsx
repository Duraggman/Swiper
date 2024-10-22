import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swiper from "react-native-swiper"; // Ensure this library is installed
import Icon from "react-native-vector-icons/FontAwesome"; // or any other icon set you prefer

const App = () => {
  const images = [
    require("../../assets/images/BowlImg.png"), // Local image
    require("../../assets/images/cinemaImg.png"), // Local image
    require("../../assets/images/stayInImg.png"), // Local image
  ];

  // Create a reference for the swiper
  const swiperRef = React.useRef(null);

  // State to hold background color and current slide index
  const [bgColor, setBgColor] = React.useState("pink");
  const [currentSlide, setCurrentSlide] = React.useState(0); // Track the current slide

  // Function that changes the background color and goes to the next slide
  const changeColorAndSlide = (color: string) => {
    setBgColor(color);
  // check if the current slide is the last slide
    setTimeout(() => {
      // Move to the next slide
      swiperRef.current.scrollBy(1);
      setCurrentSlide((prevSlide) => prevSlide + 1); // Update the current slide index
    }, 1000);

    // After 2 seconds, change the background back to pink without resetting the swiper
    setTimeout(() => {
      setBgColor("pink");
    }, 2000);
  };

  return (
    <View style={[styles.outerContainer, { backgroundColor: bgColor }]}>
      <GestureHandlerRootView style={styles.container}>
        <Swiper
          ref={swiperRef}
          style={styles.swiper}
          showsPagination={false} // Hide the default pagination
          index={currentSlide} // Ensure swiper stays on the current slide
          loop={false} // Disable looping for better control
        >
          {images.map((image, index) => (
            <View key={index} style={styles.Slides}>
              {/* Displaying the image in the swiper */}
              <Image
                source={image} // Directly use the image source
                style={styles.image} // Image styles for consistency
                resizeMode="stretch" // Ensures the image is fully visible without stretching
              />
            </View>
          ))}
        </Swiper>
        <View style={styles.btnContainer}>
          <View style={styles.btns}>
            <TouchableOpacity style={styles.btnTO} onPress={() => changeColorAndSlide('green')}>
              <Icon name="thumbs-up" size={60} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnTO} onPress={() => setBgColor("red")}>
              <Icon name="thumbs-down" size={60} color="#F44336" />
            </TouchableOpacity>
          </View>
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    opacity: 1, // Optional opacity
  },
  container: {
    flex: 1,
  },
  swiper: {
    height: "100%", // Full height of the container
  },
  Slides: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Take full width of the screen
    height: "100%", // Take full height of the screen
  },
  image: {
    width: "100%", // Ensure image takes a percentage of the container
    height: "70%", // Set to a percentage to fill the height of the container
    maxHeight: "80%", // Optional: limit height to allow some space around the image
    maxWidth: "80%", // Ensure image width does not exceed container
    borderWidth: 2, // Width of the border
    borderColor: "black", // Color of the border
    borderRadius: 10, // Rounded corners (optional)
    marginBottom: 70, // Optional padding to ensure the image is not too close to the border
    paddingHorizontal: 70, // Optional horizontal margin
  },
  btnContainer: {
    flexDirection: "row",
    bottom: 50,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
  btnTO: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 10,
  },
});

export default App;
