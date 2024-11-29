import React from "react";
import Navigation from "./src/navigation/Navigation";
import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
enableScreens();

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
};

export default App;
