import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import LandingPage from "../pages/LandingPage";
import AuthenticationPage from "../pages/AuthenticationPage";
import Home from "../pages/Home"
import History from "../pages/History";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VideoCall } from "../pages/VideoCall";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthenticationPage />} />
        <Route path="/:url" element={<VideoCall />} />
        <Route path="/history" element={ <ProtectedRoute>
              <History />
            </ProtectedRoute>} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
