import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/tokens/variables.css";
import "./styles/base/app.css";
import "./styles/components/forms.css";
import "./styles/components/buttons.css";
import "./styles/components/auth.css";
import "./styles/components/sidebar.css";
import "./styles/utilities/layout.css";
import "./styles/utilities/size.css";
import "./styles/utilities/spacing.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
