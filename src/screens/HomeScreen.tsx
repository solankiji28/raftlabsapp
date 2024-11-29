import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchProperties } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define types for property data
interface Property {
  id: string;
  title: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
  };
  images: string[];
}

type RootStackParamList = {
  PropertyDetail: { property: Property };
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PropertyDetail"
>;

const HomeScreen: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  const navigation = useNavigation<NavigationProp>();

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });

  const filteredProperties = properties?.filter((property) =>
    property.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handlePropertyPress = (property: Property) => {
    navigation.navigate("PropertyDetail", { property });
  };

  if (isLoading) {
    return (
      <Text style={styles.loadingText}>
        <ActivityIndicator />
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search properties"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredProperties}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.propertyCard}>
            <Text style={styles.propertyTitle}>{item.title}</Text>
            <Text style={styles.propertyPrice}>{item.price} USD</Text>
            <Text style={styles.propertyLocation}>
              {item.location.address}, {item.location.city},{" "}
              {item.location.state}
            </Text>
            <View style={styles.imageContainer}>
              {item.images.map((imageUrl, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUrl }}
                  style={styles.propertyImage}
                />
              ))}
            </View>
            <View style={styles.detailButton}>
              <Button
                title="View Details"
                onPress={() => handlePropertyPress(item)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9f9",
    padding: 16,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  propertyCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
    padding: 15,
  },
  propertyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  propertyPrice: {
    fontSize: 18,
    color: "#2ecc71",
    marginBottom: 5,
  },
  propertyLocation: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  propertyImage: {
    marginTop: 10,
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  detailButton: {
    marginTop: 15,
  },
});

export default HomeScreen;
