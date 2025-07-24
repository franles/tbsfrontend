import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.tsx";
import "./components/config/axios.ts";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
);
