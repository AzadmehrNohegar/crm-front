import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "@/shared/scrollToTop/index.tsx";

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
    <Suspense fallback={<>...loading</>}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
          <ScrollToTop />
        </QueryClientProvider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
