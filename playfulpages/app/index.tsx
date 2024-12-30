import { useCallback, useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  BounceIn,
  SlideInDown,
} from "react-native-reanimated";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import RippleButton from "@/components/RippleButton";
import MoonAndStars from "@/components/MoonAndStars";
import { router } from "expo-router";
const { width, height } = Dimensions.get("window");
import * as Haptics from 'expo-haptics';

// Prevent the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 2000,
  fade: true,
});


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, fontsError] = useFonts({
    "Fredoka-Bold": require("../assets/fonts/Fredoka/Fredoka-Bold.ttf"),
    "Fredoka-Regular": require("../assets/fonts/Fredoka/Fredoka-Regular.ttf"),
  });

  const stars = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 40 + 50,
    color: ["yellow", "white", "#FFD700"][Math.floor(Math.random() * 3)],
  }));

  const handleLayout = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  const prepareApp = async () => {
    try {
      await Font.loadAsync(Entypo.font);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading delay
      setAppIsReady(true);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    prepareApp();
  }, []);

  if (!fontsLoaded && !fontsError) return null;
  if (!appIsReady) return null;

  return (
    <View
      style={styles.container}
      onLayout={handleLayout}>
      {/* Background Layer */}
      <View style={styles.starsContainer}>
        <MoonAndStars />
      </View>

      {/* Foreground Content */}
      <Animated.View entering={BounceIn} style={styles.imageContainer}>
        <Image
          source={require("../assets/images/MomChildrens.png")}
          style={styles.mainImage}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View entering={SlideInDown} style={styles.loginContainer}>
        <Text style={styles.title}>Playful Pages</Text>
        <RippleButton
          buttonText="Start"
          buttonColor="#ffd54f"
          textColor="#000"
          rippleColor="#f39c12"
          rippleScaleSize={6}
          buttonWidth={200}
          buttonHeight={60}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            router.navigate('/Screens/home')
          }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  starsContainer: {
    ...StyleSheet.absoluteFillObject, // Fill the entire screen
    zIndex: 0, // Render below other content
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    zIndex: 1, // Render above stars
  },
  mainImage: {
    width: 300,
    height: 300,
  },
  loginContainer: {
    backgroundColor: "#F3E5F5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 1, // Render above stars
  },
  title: {
    fontSize: 24,
    fontFamily: "Fredoka-Bold",
    color: "#333",
    marginBottom: 20,
  },
});
