import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { RouteProp } from "@react-navigation/native";

// Define types for Property and Location
type Coordinates = {
  latitude: number;
  longitude: number;
};

type Location = {
  address: string;
  city: string;
  state: string;
  coordinates: Coordinates;
};

type Property = {
  title: string;
  price: number;
  location: Location;
  features: string[];
  images: string[];
};

// Define route params type
type PropertyDetailScreenRouteProp = RouteProp<
  { PropertyDetail: { property: Property } },
  "PropertyDetail"
>;

// Define props for the screen
type PropertyDetailScreenProps = {
  route: PropertyDetailScreenRouteProp;
};

const PropertyDetailScreen: React.FC<PropertyDetailScreenProps> = ({ route }) => {
  const { property } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.propertyTitle}>{property.title}</Text>
        <Text style={styles.propertyPrice}>{property.price} USD</Text>
      </View>

      {/* Property Location */}
      <View style={styles.locationContainer}>
        <Text style={styles.location}>
          {property.location.address}, {property.location.city},{" "}
          {property.location.state}
        </Text>
        <Text style={styles.coordinates}>
          Coordinates: {property.location.coordinates.latitude},{" "}
          {property.location.coordinates.longitude}
        </Text>
      </View>

      {/* Map View showing the location */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: property.location.coordinates.latitude,
            longitude: property.location.coordinates.longitude,
            latitudeDelta: 0.05, // Zoom level
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: property.location.coordinates.latitude,
              longitude: property.location.coordinates.longitude,
            }}
            title={property.title}
            description={property.location.address}
          />
        </MapView>
      </View>

      {/* Property Features */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresHeader}>Features:</Text>
        <View style={styles.featuresList}>
          {property.features.map((feature, index) => (
            <Text key={index} style={styles.featureItem}>
              {feature}
            </Text>
          ))}
        </View>
      </View>

      {/* Property Images */}
      <View style={styles.imageContainer}>
        <Text style={styles.imageHeader}>Images:</Text>
        <ScrollView
          horizontal
          style={styles.imageScroll}
          showsHorizontalScrollIndicator={false}
        >
          {property.images.map((imageUrl, index) => (
            <Image key={index} source={{ uri: imageUrl }} style={styles.propertyImage} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  header: {
    marginBottom: 15,
  },
  propertyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  propertyPrice: {
    fontSize: 22,
    color: "#2ecc71",
  },
  locationContainer: {
    marginVertical: 10,
  },
  location: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  coordinates: {
    fontSize: 14,
    color: "#95a5a6",
    marginTop: 5,
  },
  mapContainer: {
    height: 250, // Map height
    marginVertical: 15,
  },
  map: {
    flex: 1,
    borderRadius: 10,
  },
  featuresContainer: {
    marginVertical: 15,
  },
  featuresHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  featuresList: {
    marginLeft: 10,
  },
  featureItem: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 5,
  },
  imageContainer: {
    marginVertical: 15,
  },
  imageHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageScroll: {
    marginBottom: 20,
  },
  propertyImage: {
    width: 250,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default PropertyDetailScreen;
