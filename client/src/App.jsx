import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signin } from "./pages/auth/Signin";
import { PageNotFound } from "./pages/PageNotFound";
import { Profile } from "./pages/common/Profile";
import { UserSettings } from "./pages/common/Settings";
import UserProtectedRoute from "./context/UserProtectedRoute";
import { Signup } from "./pages/auth/Signup";
import ClubProtectedRoute from "./context/ClubProtectedRoute";
import { Verification } from "./pages/auth/Verification";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify" element={<Verification/>}/>
      <Route
        path="/user/:username"
        element={
          <UserProtectedRoute>
            <Profile />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/club/:username"
        element={
          <ClubProtectedRoute>
            <Profile />
          </ClubProtectedRoute>
        }
      />
      <Route
        path="user/settings"
        element={
          <UserProtectedRoute>
            <UserSettings />
          </UserProtectedRoute>
        }
      />
      <Route
        path="club/settings"
        element={
          <ClubProtectedRoute>
            <UserSettings />
          </ClubProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
