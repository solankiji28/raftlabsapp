import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../services/api";

// Define the type for a User
type User = {
  name: string;
  email: string;
};

const ProfileScreen: React.FC = () => {
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery<User>({
    queryKey: ["userProfile"],
    queryFn: fetchUser,
  });

  if (userLoading) return <Text>Loading...</Text>;
  if (userError) return <Text>Error loading data</Text>;

  return (
    <View style={styles.container}>
      {/* Display User Profile */}
      <View style={styles.profileSection}>
        <Text style={styles.profileItem}>Name: {user?.name}</Text>
        <Text style={styles.profileItem}>Email: {user?.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  profileSection: {
    marginBottom: 20,
  },
  profileItem: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProfileScreen;
