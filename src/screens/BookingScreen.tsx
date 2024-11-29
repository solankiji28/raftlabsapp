import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchBookings } from "../services/api";

// Define the type for a booking
type Booking = {
  id: number;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  status: "confirmed" | "pending"; // Adjust status types as per API response
};

const BookingScreen: React.FC = () => {
  const { data: bookings, isLoading } = useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });

  if (isLoading)
    return (
      <ActivityIndicator size="large" color="#2ecc71" style={styles.loader} />
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookingCard}>
            <Text style={styles.bookingTitle}>
              propertyId: {item.propertyId}
            </Text>
            <View style={styles.bookingDetails}>
              <Text style={styles.text}>Check-in: {item.checkIn}</Text>
              <Text style={styles.text}>Check-out: {item.checkOut}</Text>
              <Text
                style={[
                  styles.text,
                  item.status === "confirmed"
                    ? styles.statusConfirmed
                    : styles.statusPending,
                ]}
              >
                Status: {item.status}
              </Text>
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
    padding: 15,
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50%",
  },
  bookingCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  bookingTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 10,
  },
  bookingDetails: {
    marginTop: 2,
  },
  text: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 5,
  },
  statusConfirmed: {
    color: "#27ae60",
  },
  statusPending: {
    color: "#e74c3c",
  },
});

export default BookingScreen;
