import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import { ClubProvider } from "./context/ClubContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ClubProvider>
          <App />
        </ClubProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
