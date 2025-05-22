import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signin } from "./pages/auth/Signin";
import { PageNotFound } from "./pages/PageNotFound";
import { UserProfile } from "./pages/common/Profile";
import { UserSettings } from "./pages/common/Settings";
import ProtectedRoute from "./context/ProtectedRoute";
import { Signup } from "./pages/auth/Signup";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/user/:username"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="user/settings"
        element={
          <ProtectedRoute>
            <UserSettings />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
