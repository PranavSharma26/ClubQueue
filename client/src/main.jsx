import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import { ClubProvider } from "./context/ClubContext.jsx";
import { EventProvider } from "./context/EventContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ClubProvider>
          <EventProvider>
            <App />
          </EventProvider>
        </ClubProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
