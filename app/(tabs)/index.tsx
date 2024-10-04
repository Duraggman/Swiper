import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, PanResponder, Animated } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome"; // or any other icon set you prefer

const App = () => {
  const images = [ // Array of images to display
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
    
    setTimeout(() => {
      // Move to the next slide
      setCurrentSlide((prevSlide) => prevSlide + 1); // Update the current slide index
    }, 1000);

    // After 2 seconds, change the background back to pink without resetting the swiper
    setTimeout(() => {
      setBgColor("pink");
    }, 1000);
  };

    // State for tracking the index of the currently displayed card
    const [currentIndex, setCurrentIndex] = React.useState(0);

    // Animated value for card swiping
    const pan = React.useRef(new Animated.ValueXY()).current;

    // Create a PanResponder to handle swipe gestures
    const panResponder = React.useRef(
      PanResponder.create({
        // Determine if a swipe gesture should be recognized
        onMoveShouldSetPanResponder: (_, gestureState) => {
          // Only recognize horizontal swipes (significant movement)
          return Math.abs(gestureState.dx) > 20;
        },
        // Handle the movement of the card
        onPanResponderMove: Animated.event(
          [null, { dx: pan.x, dy: pan.y }], // Bind the x and y values to animated values
          { useNativeDriver: false } // Do not use native driver for this animation
        ),
        // Handle the release of the swipe gesture
        onPanResponderRelease: (e, gestureState) => {
          const { dx } = gestureState; // Get the horizontal swipe distance
  
          // Determine if the swipe is valid (either left or right)
          if (dx > 120) {
            // Right swipe detected
            Animated.timing(pan, {
              toValue: { x: 500, y: gestureState.dy }, // Animate off to the right
              duration: 200, // Duration of the animation
              useNativeDriver: true, // Use native driver for better performance
            }).start(() => {
              pan.setValue({ x: 0, y: 0 }); // Reset the animated value
              setCurrentIndex((prev) => (prev + 1) % images.length); // Move to the next image
            });
          } else if (dx < -120) {
            // Left swipe detected
            Animated.timing(pan, {
              toValue: { x: -500, y: gestureState.dy }, // Animate off to the left
              duration: 200,
              useNativeDriver: true,
            }).start(() => {
              pan.setValue({ x: 0, y: 0 }); // Reset the animated value
              setCurrentIndex((prev) => (prev + 1) % images.length); // Move to the next image
            });
          } else {
            // If swipe was not significant, reset position
            Animated.timing(pan, {
              toValue: { x: 0, y: 0 }, // Reset back to the center
              duration: 200,
              useNativeDriver: true,
            }).start();
          }
        },
      })
    ).current; // Use the current value of panResponder

    return (
      // Root view for gesture handling
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.outerContainer}>
          {/* Map through images and render cards */}
          {images.map((image, index) => {
            // Hide cards that have already been swiped away
            if (index < currentIndex) return null; // Skip rendering for previous cards
  
            const isCurrentCard = index === currentIndex; // Check if this is the current card
            const rotate = pan.x.interpolate({
              inputRange: [-200, 200], // Define input range for rotation
              outputRange: ["-30deg", "30deg"], // Define output range for rotation
              extrapolate: "clamp", // Prevent output from going beyond the range
            });
  
            return (
              <Animated.View
                key={index}
                style={[styles.card,
                  // Apply transformation only if this is the current card
                  isCurrentCard ? { transform: [...pan.getTranslateTransform(), { rotate }] } : null,
                  { zIndex: images.length - index }, // Ensure cards stack correctly
                ]}
                {...(isCurrentCard ? panResponder.panHandlers : {})} // Attach PanResponder handlers only to the current card
              >
                <Image source={image} style={styles.image} resizeMode="cover" /> {/* Render the image */}
              </Animated.View>
            );
          })}
        </View>


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
  card: {
    position: "absolute", // Stack cards on top of each other
    width: "90%", // Set width of the card
    height: "80%", // Set height of the card
    borderRadius: 10, // Rounded corners for the card
    overflow: "hidden", // Ensure no overflow from the card
    },
});

export default App;
