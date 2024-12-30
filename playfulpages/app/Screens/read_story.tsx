import CustomText from "@/components/CustomText";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image
} from "react-native";
import PagerView from 'react-native-pager-view';
import Animated, { useHandler, useEvent } from 'react-native-reanimated';
import axios from 'axios';
import { router, useLocalSearchParams, useNavigation } from "expo-router";


const AnimatedPager = Animated.createAnimatedComponent(PagerView);

type StoryItem = {
  image: string | null;
  page: number;
  story: string;
};

export function usePagerScrollHandler(handlers: any, dependencies?: any) {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);
  const subscribeForEvents = ['onPageScroll'];

  return useEvent<any>(
    (event) => {
      'worklet';
      const { onPageScroll } = handlers;
      if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
        onPageScroll(event, context);
      }
    },
    subscribeForEvents,
    doDependenciesDiffer
  );
}


export default function ReadStory() {

  const [isLoading, setIsLoading] = useState(true);
  const [storyData, setStoryData] = useState<StoryItem[]>([]);
  const navigation = useNavigation();
  const router_param = useLocalSearchParams();


  const storyItems = [
    { "image": "https://dalleprodsec.blob.core.windows.net/private/images/fa099383-1b15-4560-8cca-01655d64851d/generated_00.png?se=2024-12-31T03%3A05%3A53Z&sig=ZJQb9gWScxYnFJZdxZ0WpxpGsHyOrWYTCKH7l53sThw%3D&ske=2025-01-04T13%3A34%3A11Z&skoid=e52d5ed7-0657-4f62-bc12-7e5dbb260a96&sks=b&skt=2024-12-28T13%3A34%3A11Z&sktid=33e01921-4d64-4f8c-a055-5bdaffd5e33d&skv=2020-10-02&sp=r&spr=https&sr=b&sv=2020-10-02", "page": 1, "story": "Leo discovered a glowing key in his backyard." },
    { "image": "https://dalleprodsec.blob.core.windows.net/private/images/318213f5-d76e-4e29-b09a-f46a1a72e1cf/generated_00.png?se=2024-12-31T03%3A06%3A04Z&sig=oEeoA7kvwXxdZTH%2B%2BN%2FPbBNER8EX7W2ry6nG0WNUKE4%3D&ske=2025-01-05T13%3A04%3A26Z&skoid=e52d5ed7-0657-4f62-bc12-7e5dbb260a96&sks=b&skt=2024-12-29T13%3A04%3A26Z&sktid=33e01921-4d64-4f8c-a055-5bdaffd5e33d&skv=2020-10-02&sp=r&spr=https&sr=b&sv=2020-10-02", "page": 2, "story": "The key shimmered and whispered secrets of a hidden world." },
    { "image": "https://dalleprodsec.blob.core.windows.net/private/images/fb306df7-a7ac-4e47-94d6-9fab5cd44543/generated_00.png?se=2024-12-31T03%3A06%3A14Z&sig=MMYS3G7tZBXXPXrI4svpVCMWjCAl%2F6CJkMt8QAcmvWE%3D&ske=2025-01-06T00%3A20%3A10Z&skoid=e52d5ed7-0657-4f62-bc12-7e5dbb260a96&sks=b&skt=2024-12-30T00%3A20%3A10Z&sktid=33e01921-4d64-4f8c-a055-5bdaffd5e33d&skv=2020-10-02&sp=r&spr=https&sr=b&sv=2020-10-02", "page": 3, "story": "Following the whispers, Leo found a door in an old oak tree." },
    { "image": null, "page": 4, "story": "The door opened to a magical forest filled with talking animals." },
    { "image": null, "page": 5, "story": "A wise owl told Leo the key could unlock the Crystal Tower." },
    { "image": null, "page": 6, "story": "The Crystal Tower held the power to save the forest from darkness." },
    { "image": null, "page": 7, "story": "Leo faced a riddle-guarding troll on the path to the tower." },
    { "image": null, "page": 8, "story": "Using his wits, Leo solved the riddle and gained passage." },
    { "image": null, "page": 9, "story": "At the tower, Leo used the key to unleash a wave of light." },
    { "image": null, "page": 10, "story": "The forest was saved, and Leo learned the value of courage and cleverness." }
  ];
  
  const handler = usePagerScrollHandler({
    onPageScroll: (e: any) => {
      'worklet';
      console.log(e.offset, e.position);
    },
  });

  const getStories = async () => {
    try {
      const response = await axios.post('http://192.168.89.193:3000/api/generate-story', {
        gender: "male",
        storyType: router_param.story_type,
        name: "vikash"
      });
      console.log(response.data.story);
      setStoryData(response.data.story)
      setIsLoading(false)
    } catch (error) {
      //go back to home screen 
      router.back()
      console.error(error);
    }
  };



  useEffect(() => {
    getStories();
    return () => {
      // Cleanup if needed
      setIsLoading(true)
    };
  }, []);



  return (
    <LinearGradient
      colors={["#6A0DAD", "#BA55D3", "#FFC0CB"]}
      style={styles.container}
    >
      {
        isLoading ?
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={require('@/assets/images/loading-bird-dance.gif')}
                style={{
                  height: 300,
                  width: 300,
                  borderRadius: 200
                }}
              />
              <CustomText fontFamily="Fredoka-Bold" style={{ color: "#4B0082", fontSize: 22, marginTop: 50, textAlign: 'center', marginHorizontal: 15, borderRadius: 10, lineHeight: 30 }}>Writing your story please wait...</CustomText>
            </View>
          </View>
          :
          <AnimatedPager
            testID={'pager-view'}
            style={styles.pagerView}
            initialPage={0}
            onPageScroll={handler}
          >
            {
              storyData.map((item: any, index) => {
                return (
                  <LinearGradient
                    colors={["#6A0DAD", "#BA55D3", "#FFC0CB"]}
                    style={styles.container}
                    key={index}
                  >
                    <View style={{ flex: 0.1, }}>
                      {
                        index == 0 && <CustomText fontFamily="Fredoka-Bold" style={{ color: "#FFD700", fontSize: 32, marginTop: 30, textAlign: 'center', marginHorizontal: 15, }}>{item.title}</CustomText>
                      }
                    </View>
                    <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                      <Image
                        source={
                          item.image
                            ? { uri: item.image }
                            : require('@/assets/images/image_failed.png')
                        }
                        style={{
                          height: 300,
                          width: 300,
                          resizeMode: 'contain',
                          borderRadius: 30
                        }}
                      />
                      <CustomText fontFamily="Fredoka-Bold" style={{ color: "#4B0082", fontSize: 18, marginTop: 30, textAlign: 'center', marginHorizontal: 15, backgroundColor: 'pink', borderRadius: 10, lineHeight: 30 }}>{item.story}</CustomText>

                    </View>
                  </LinearGradient>
                )
              })
            }
          </AnimatedPager>
      }
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    borderRadius: 10,
  },
  textContainer: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  storyText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  pagerView: {
    flex: 1,
  },
});
