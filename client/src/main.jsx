import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import { ClubProvider } from "./context/ClubContext.jsx";
import { EventProvider } from "./context/EventContext.jsx";
import { SearchProvider } from "./context/searchContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ClubProvider>
          <EventProvider>
            <SearchProvider>
              <App />
            </SearchProvider>
          </EventProvider>
        </ClubProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
