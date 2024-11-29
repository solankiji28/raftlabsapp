import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import BookingsScreen from "../screens/BookingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import PropertyDetailScreen from "../screens/PropertyDetailScreen";
import { MaterialCommunityIcons } from "react-native-vector-icons";

// Define types for navigation params
type TabParamList = {
  Home: undefined;
  Bookings: undefined;
  Profile: undefined;
};

type StackParamList = {
  Tab: undefined;
  PropertyDetail: { propertyId: string }; // Replace with actual property ID type if necessary
};

// Tab Navigation
const Tab = createBottomTabNavigator<TabParamList>();
const TabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName: string | undefined;
        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "Bookings") {
          iconName = "book";
        } else if (route.name === "Profile") {
          iconName = "account";
        }
        return (
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        );
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Bookings" component={BookingsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Stack Navigation
const Stack = createStackNavigator<StackParamList>();

const Tabs: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tab">
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PropertyDetail"
          component={PropertyDetailScreen}
          options={{ title: "Property Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;
