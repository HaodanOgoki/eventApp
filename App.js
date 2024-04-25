import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/navigation/AppNavigation";

export default function App() {
        return (
            <NavigationContainer>
                <AppNavigation />
            </NavigationContainer>
        );    
}
