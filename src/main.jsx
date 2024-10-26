import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import SocketHook from "./context-providers/socket-hook.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <CssBaseline />
<BrowserRouter>
    <SocketHook>
      <App />
    </SocketHook>
</BrowserRouter>
  </>
);
