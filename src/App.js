import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingDominiosCorreo from "../src/pages/LandingDominiosCorreo";
import LeadList from "./LeadList";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingDominiosCorreo />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <LeadList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}