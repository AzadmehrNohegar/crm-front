import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "@/shared/scrollToTop/index.tsx";
import { HelmetProvider } from "react-helmet-async";

import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <App />
          <ScrollToTop />
        </HelmetProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
