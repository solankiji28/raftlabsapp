# **React Native Property Listing App**

This project is a **React Native Property Listing App** built with **Expo**, **Jotai** for state management, and **React Query** for server state management. The app fetches property details and allows users to interact with property data and bookings.

---

## **Prerequisites**
1. **Node.js**: Install [Node.js](https://nodejs.org) (recommended version >= 14.x).
2. **Expo CLI**: Install Expo CLI globally:
   ```bash
   npm install -g expo-cli
   ```
3. **JSON Server**: Install JSON Server globally for simulating a backend:
   ```bash
   npm install -g json-server
   ```
4. **React Native Development Environment**: Ensure you’ve set up React Native as per the [official guide](https://reactnative.dev/docs/environment-setup).

---

## **Setup Instructions**
### 1. Clone the Repository
Clone the project to your local system:
```bash
git clone https://github.com/your-repository-url.git
cd your-repository-folder
```

### 2. Install Dependencies
Install the required dependencies:
```bash
npm install
```

### 3. Set Up the JSON Server
1. Create a `db.json` file in the root of the project with the following sample data:
   ```json
   {
     "properties": [
       {
         "id": "1",
         "title": "Modern Downtown Apartment",
         "price": 2500,
         "location": {
           "address": "123 Main St",
           "city": "San Francisco",
           "state": "CA",
           "coordinates": {
             "latitude": 37.7749,
             "longitude": -122.4194
           }
         },
         "features": ["2 Bedrooms", "2 Bathrooms", "Parking", "Pool"],
         "images": [
           "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
           "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
           "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8"
         ]
       }
     ],
     "bookings": [
       {
         "id": "1",
         "propertyId": "1",
         "userId": "user1",
         "checkIn": "2024-02-01",
         "checkOut": "2024-02-05",
         "status": "confirmed"
       }
     ]
   }
   ```

2. Start the JSON server:
   ```bash
   json-server --watch db.json --port 3000
   ```

   The API will now be available at `http://localhost:3000`.

---

### 4. Run the App
Start the Expo development server:
```bash
npm start
```

1. **For a Web Browser**:
   Press `w` to open the app in your browser.

2. **For a Mobile Device**:
   - Download the **Expo Go** app on your Android or iOS device.
   - Scan the QR code displayed in the terminal.

3. **For a Simulator/Emulator**:
   - Press `i` to open in the iOS simulator (Mac only).
   - Press `a` to open in the Android emulator.

---

## **Key Features**
- **Property Listing**: Displays a list of properties fetched from a local API.
- **Property Detail**: Shows property details, including a map and features.
- **Booking Management**: Displays a list of user bookings.

---

## **Troubleshooting**
### Common Issues:
1. **Network Error**:
   - Ensure the JSON server is running on `http://localhost:3000`.
   - If using a physical device, replace `localhost` with your machine’s IP address in the `baseURL` of `axios`.

   Example:
   ```javascript
   const api = axios.create({
     baseURL: "http://192.168.1.100:3000", // Replace with your IP address
   });
   ```

2. **Expo Cache Issues**:
   Clear the Expo cache and restart:
   ```bash
   npm start -- --clear
   ```

3. **React Native Doctor**:
   Run this command to check your environment setup:
   ```bash
   npx react-native doctor
   ```

---

## **Project Folder Structure**
```plaintext
.
├── App.js                 # Main app entry point
├── db.json                # JSON server database
├── src/
│   ├── components/        # Reusable components
│   ├── screens/           # Screen components (HomeScreen, PropertyDetailScreen, etc.)
│   ├── services/          # API service files (fetchBookings, fetchProperties, etc.)
│   ├── store/             # State management files (Jotai atoms)
├── package.json           # Project dependencies
└── README.md              # Setup and usage instructions
```

---

## **Future Improvements**
- Add a real backend to handle property and booking data.
- Implement authentication for user-specific bookings.
- Enhance the UI with animations and additional filters.

---

Let me know if you encounter any issues while following these instructions!
