import React, { useState, useRef } from "react";
import { StyleSheet, View, Image, Button, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swiper from "react-native-swiper"; // Ensure this library is installed

const App = () => {
  // Reference for swiper component
  const swiperRef = useRef<Swiper>(null);

  // default bg color
  const [bgColor, setBgColor] = useState("pink");

  //function to change the color of the L button
  const changeButtonColor = (
    color: string,
    swiper: React.RefObject<Swiper>
  ) => {
    setBgColor(color);
    setTimeout(() => {
      setBgColor("pink");
    }, 1000);

    // Move to the next slide
    if (swiper.current) {
      swiper.current.scrollBy(1);
    }
  };

  const images = [
    require("../../assets/images/BowlImg.png"), // Local image
    require("../../assets/images/cinemaImg.png"), // Local image
    require("../../assets/images/stayInImg.png"), // Local image
  ];

  return (
    // Background color uses the state above.
    <GestureHandlerRootView
      style={[styles.container, { backgroundColor: bgColor }]}
    >
      <Swiper
        ref={swiperRef} // Reference to the swiper component
        style={styles.swiper}
        showsPagination={false} // Hide the default pagination
        loop={false} // Prevent infinite loop
      >
        {images.map((image, index) => (
          <View key={index} style={styles.maroonSlide}>
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
          <Pressable style={styles.pBtns}>
            <Button
              title="Thumb"
              onPress={() => changeButtonColor("green", swiperRef)}
            />
          </Pressable>
          <Pressable style={styles.pBtns}>
            <Button
              title="Next"
              onPress={() => changeButtonColor("red", swiperRef)}
            />
          </Pressable>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiper: {
    height: "100%", // Full height of the container
  },
  maroonSlide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Take full width of the screen
    height: "100%", // Take full height of the screen
    backgroundColor: "transparent", // Transparent background
  },
  image: {
    width: "100%", // Ensure image takes a percentage of the container
    height: "100%", // Set to a percentage to fill the height of the container
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
  pBtns: {
    backgroundColor: "black",
  },
});

export default App;
