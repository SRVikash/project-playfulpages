import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import CustomText from '@/components/CustomText';
import { Audio } from 'expo-av';  // Importing Audio from expo-av
import Unmute from '@/assets/images/Unmute';
import Mute from '@/assets/images/Mute';
import { router } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';
import RippleButton from '@/components/RippleButton';
import * as Haptics from 'expo-haptics';
import { useIsFocused } from '@react-navigation/native';

export default function Home() {
  // Explicitly type the state to accept Audio.Sound or undefined
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [toggleMute, setToggleMute] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const { width, height } = Dimensions.get("window");
  const isFocused = useIsFocused();

  // Set up the audio player when the component mounts
  useEffect(() => {
    let audioInstance: Audio.Sound | null = null;

    const loadAudio = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('@/assets/sounds/main_bgm.mp3'),
          { shouldPlay: true, isLooping: true }
        );
        audioInstance = sound;
        setSound(sound);
      } catch (error) {
        console.error("Audio load error:", error);
      }
    };

    const stopAudio = async () => {
      if (audioInstance) {
        try {
          await audioInstance.stopAsync();
          await audioInstance.unloadAsync(); // Properly unload the audio resource
        } catch (error) {
          console.error("Error stopping/unloading audio:", error);
        }
      }
    };

    if (isFocused) {
      loadAudio();
    } else {
      stopAudio();
    }

    return () => {
      stopAudio(); // Ensure cleanup on component unmount
    };
  }, [isFocused]);


  const storyData = [
    {
      id: "fantasy",
      title: "The Enchanted Realm",
      genre: "Fantasy",
      image: require("@/assets/images/story_adventure.gif")
    },
    {
      id: "forest",
      title: "The Whispering Woods",
      genre: "Adventure",
      image: require("@/assets/images/story_forest.gif")
    }
  ];

  return (
    <LinearGradient colors={["#6A0DAD", "#BA55D3", "#FFC0CB"]} style={styles.container}>
      <View style={{ flex: 0.1, justifyContent: 'space-around', marginHorizontal: 10, alignItems: 'center', flexDirection: 'row' }}>
        <CustomText fontFamily="Fredoka-Bold" style={{ color: "white", fontSize: 35, }}>Create Story</CustomText>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              setToggleMute(!toggleMute);
              toggleMute ? sound?.playAsync() : sound?.pauseAsync();  // Use optional chaining to prevent errors
            }}
            style={{
              width: 45,
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12
            }}>
            {toggleMute ? <Mute width={30} height={30} fill="#fff" /> : <Unmute width={30} height={30} fill="#fff" />}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              backgroundColor: "white",
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 35
            }}
            onPress={() => router.navigate('/Screens/profile')}
          >
            <Image
              source={require('../../assets/images/profile_boy.png')}
              style={{ height: 32, width: 32 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flex: 0.65, justifyContent: 'center', alignItems: 'center' }}>
          <Carousel
            width={width}
            height={height * 0.5}
            data={storyData}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setStoryIndex(index)}
            renderItem={({ item }) => (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <CustomText fontFamily="Fredoka-Bold" style={{ color: "#FFD700", fontSize: 30, marginBottom: 30 }}>
                  {item.title}
                </CustomText>
                <Image
                  source={item.image}
                  style={{ flex: 0.6, borderRadius: 20 }}
                />
                <CustomText fontFamily="Fredoka-Bold" style={{ color: "#4B0082", fontSize: 20, marginTop: 30 }}>
                  Genre: {item.genre}
                </CustomText>
              </View>
            )}
          />
          <RippleButton
            buttonText="Select"
            buttonColor="#FFD700"
            textColor="#333333"
            rippleColor="rgba(255, 255, 255, 0.4)"
            rippleScaleSize={6}
            buttonWidth={200}
            buttonHeight={60}
            onPress={() => {
              sound?.stopAsync();
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.navigate({ pathname: '/Screens/read_story', params: { story_type: storyData[storyIndex].genre } })
              // router.navigate('/Screens/read_story');
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
