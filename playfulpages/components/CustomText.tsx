import React from "react";
import { Text, StyleSheet, TextStyle, TextProps } from "react-native";

interface CustomTextProps extends TextProps {
    style?: TextStyle | TextStyle[]; // Accepts a single style or an array of styles
    children: React.ReactNode;
    fontFamily?: string; // Optional font family
}

const CustomText: React.FC<CustomTextProps> = ({ style, fontFamily, children, ...props }) => {
    return (
        <Text
            style={[
                styles.defaultText,
                { fontFamily: fontFamily || "System" },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    defaultText: {
        fontSize: 16,
        color: "#333", // Default text color
    },
});

export default CustomText;
