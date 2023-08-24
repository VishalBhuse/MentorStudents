import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import Store from "./Redux/Store";
import { Provider } from "react-redux";
import Footer from "./Component/Footer";
import RecordingPage from "./Component/RecordingPage";
import RecordedVideos from "./Component/RecordedVideos";
import Navbar from "./Component/Navbar";
import RequireAuth from "./HOC/RequiredAuth";

const App = () => {
  return (
    <Provider store={Store}>
      <ChakraProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
