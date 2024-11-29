import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.3:3000",
  // baseURL: "https://pastebin.com/raw/Sa0LzR3T",
});

// Define types for the responses
interface Property {
  id: string;
  name: string;
  location: string;
  [key: string]: any; // Add additional fields as needed
}

interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  [key: string]: any; // Add additional fields as needed
}

interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: any; // Add additional fields as needed
}

// Fetch all properties
export const fetchProperties = async (): Promise<Property[]> => {
  try {
    const response = await api.get<Property[]>("/properties");
    return response.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

// Book a property
export const bookProperty = async (propertyId: string): Promise<any> => {
  try {
    const response = await api.post("/bookings", { propertyId });
    return response.data;
  } catch (error) {
    console.error("Error booking property:", error);
    throw error;
  }
};

// Fetch all bookings
export const fetchBookings = async (): Promise<Booking[]> => {
  try {
    const response = await api.get<Booking[]>("/bookings");
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

// Fetch User
export const fetchUser = async (): Promise<User> => {
  try {
    const response = await api.get<User>("/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
