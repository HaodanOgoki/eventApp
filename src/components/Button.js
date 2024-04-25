import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { COLORS, FONTS } from "../constants";

export default function Button({ title, containerStyle, onPress }) {
    return (
        <TouchableOpacity
            style={{
                height: 60,
                backgroundColor: COLORS.black,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                ...containerStyle,
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: COLORS.white,
                    ...FONTS.Lato_700Bold,
                    fontSize: 18,
                    textTransform: "capitalize",
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}
