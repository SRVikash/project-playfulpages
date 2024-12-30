import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Svg, { Polygon, Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

// Star Component
const Star = ({ size = 50, color = "yellow", x = 0, y = 0 }) => {
  const randomDuration = Math.random() * 2000 + 1000; // Random duration: 1000-3000ms
  const randomOpacityStart = Math.random() * 0.5 + 0.5; // Random opacity: 0.5-1

  const scale = useSharedValue(1); // Scale animation
  const opacity = useSharedValue(randomOpacityStart); // Opacity animation

  useEffect(() => {
    // Add shrink and expand animation
    scale.value = withRepeat(
      withTiming(Math.random() > 0.5 ? 0.1 : 1.5, {
        duration: randomDuration,
        easing: Easing.inOut(Easing.ease)
      }),
      -1, // Infinite loop
      true // Reverse direction
    );

    opacity.value = withRepeat(
      withTiming(Math.random() * 0.5 + 0.5, {
        duration: randomDuration / 2
      }),
      -1,
      true
    );
  }, [scale, opacity, randomDuration]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <AnimatedSvg
      height={size}
      width={size}
      viewBox="0 0 47.94 47.94"
      style={[{ position: "absolute", top: y, left: x }, animatedStyle]}
    >
      <Path
        d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
          c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
          c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
          c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
          c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
          C22.602,0.567,25.338,0.567,26.285,2.486z"
        fill={color}
      />
    </AnimatedSvg>
  );
};


// Moon Component
const Moon = () => {
  return (
    <Svg
      height={150}
      width={150}
      viewBox="0 0 56 56"
      style={styles.moonContainer}
    >
      <Path
        d="M29,28c0-11.917,7.486-22.112,18-26.147C43.892,0.66,40.523,0,37,0C21.561,0,9,12.561,9,28
          s12.561,28,28,28c3.523,0,6.892-0.66,10-1.853C36.486,50.112,29,39.917,29,28z"
        fill="white"
      />
    </Svg>
  );
};

// MoonAndStars Component
const MoonAndStars = () => {
  const stars = Array.from({ length: 50 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 30 + 20, // Size between 20 and 50
    color: ["yellow", "white", "#FFD700", "#ADD8E6"][Math.floor(Math.random() * 4)],
  }));


  return (
    <LinearGradient
      colors={["#6A0DAD", "#BA55D3", "#FFC0CB"]}
      style={styles.container}>
      {/* Render Moon (always top-right) */}
      <Moon />
      {/* Render Stars */}
      {stars.map((star, index) => (
        <Star key={index} {...star} />
      ))}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  moonContainer: {
    position: "absolute",
    top: 30, // Padding from the top
    left: 30, // Padding from the left
    zIndex: 10, // Ensure moon is above other components
  },
});

export default MoonAndStars;
