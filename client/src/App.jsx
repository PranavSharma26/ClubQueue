import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signin } from "./pages/auth/Signin";
import { PageNotFound } from "./pages/PageNotFound";
import { Profile } from "./pages/common/Profile";
import UserProtectedRoute from "./context/UserProtectedRoute";
import { Signup } from "./pages/auth/Signup";
import ClubProtectedRoute from "./context/ClubProtectedRoute";
import { Verification } from "./pages/auth/Verification";
import PublicOnlyRoute from "./context/PublicOnlyRoutes";
import { ClubDashboard } from "./pages/club/Dashboard";
import { LikedEventsPage } from "./pages/user/LikedEventsPage";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { ChangePassword } from "./pages/auth/ChangePassword";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/signin"
        element={
          <PublicOnlyRoute>
            <Signin />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicOnlyRoute>
            <Signup />
          </PublicOnlyRoute>
        }
      />
      <Route path="/verify" element={<Verification />} />
      <Route
        path="/user/:username"
        element={
          <UserProtectedRoute>
            <Profile />
          </UserProtectedRoute>
        }
      />
      <Route
        path="/forgotPassword"
        element={
          <PublicOnlyRoute>
            <ForgotPassword />
          </PublicOnlyRoute>
        }
      />
      <Route path='/changePassword' element={
        <PublicOnlyRoute>
          <ChangePassword />
        </PublicOnlyRoute>
      }/>
      <Route
        path="/user/liked"
        element={
          <UserProtectedRoute>
            <LikedEventsPage />
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
        path="/club/dashboard"
        element={
          <ClubProtectedRoute>
            <ClubDashboard />
          </ClubProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
