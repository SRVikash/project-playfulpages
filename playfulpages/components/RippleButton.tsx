import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, ZoomIn } from 'react-native-reanimated';

const RippleButton = ({
    buttonText = 'Click Me', // Default button text
    buttonColor = '#007bff', // Default button color
    textColor = '#fff', // Default text color
    rippleColor = '#fff', // Default ripple color
    onPress = () => { }, // Default press action
    rippleScaleSize = 4, // Default ripple scale size
    buttonWidth = 150, // Default button width
    buttonHeight = 50, // Default button height
}) => {
    const rippleScale = useSharedValue(0);
    const rippleOpacity = useSharedValue(0.5);

    const rippleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: rippleScale.value }],
        opacity: rippleOpacity.value,
    }));

    const handlePressIn = () => {
        rippleScale.value = withTiming(rippleScaleSize, { duration: 300 });
        rippleOpacity.value = withTiming(0, { duration: 300 });
    };

    const handlePressOut = () => {
        rippleScale.value = withTiming(0, { duration: 300 });
        rippleOpacity.value = withTiming(0.5, { duration: 300 });
    };

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                {
                    backgroundColor: buttonColor,
                    width: buttonWidth,
                    height: buttonHeight,
                    opacity: pressed ? 0.9 : 1,
                },
            ]}
        >
            <View style={styles.rippleContainer}>
                <Animated.View
                    style={[
                        styles.ripple,
                        rippleStyle,
                        { backgroundColor: rippleColor },
                    ]}
                />
                <Text style={[styles.buttonText, { color: textColor }]}>
                    {buttonText}
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Ensure ripple stays within bounds
        elevation: 5, // Add shadow for Android
    },
    rippleContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    ripple: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Fredoka-Bold',
    },
});

export default RippleButton;
