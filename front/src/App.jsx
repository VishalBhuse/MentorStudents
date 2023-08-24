import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import RecordingPage from "./Component/RecordingPage";
import RecordedVideos from "./Component/RecordedVideos";
import RequireAuth from "./HOC/RequiredAuth";

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Provider store={Store}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/record"
              element={
                <RequireAuth>
                  <RecordingPage />
                </RequireAuth>
              }
            />
            <Route
              path="/video"
              element={
                <RequireAuth>
                  <RecordedVideos />
                </RequireAuth>
              }
            />
          </Routes>
          <Footer />
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
