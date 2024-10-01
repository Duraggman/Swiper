const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* ImageBackground wrapping the entire content */}
      <ImageBackground
        source={require('../../assets/images/BB_911.png')} // Add your background image here
        style={styles.background}
        resizeMode="cover"
      >
        {/* Title of the app, centered at the top */}
        <Text style={styles.title}>Swiper App</Text>

        {/* Swiper component to create a horizontal image carousel */}
        <Swiper style={styles.swiper} showsPagination={true}>
          {/* Slide with image */}
          <View style={styles.slide}>
            <Image source={require('../../assets/images/BB_911.png')} style={styles.image} />
          </View>
          {/* Add more slides if needed */}
        </Swiper>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};