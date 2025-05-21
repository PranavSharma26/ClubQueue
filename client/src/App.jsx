import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signin } from "./pages/Signin";
import { UserSignin } from "./pages/user/userSignin";
import { PageNotFound } from "./pages/PageNotFound";
import { UserSignup } from "./pages/user/userSignup";
import { UserProfile } from "./pages/user/UserProfile";
import { UserSettings } from "./pages/user/UserSettings";
import ProtectedRoute from "./context/ProtectedRoute";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signin/user" element={<UserSignin />} />
      <Route path="/signup/user" element={<UserSignup />} />
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
