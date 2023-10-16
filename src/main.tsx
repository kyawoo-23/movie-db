import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@/pages/Home/HomePage.tsx";
import Layout from "@/components/Layout";
import MovieDetails from "@/pages/Details/MovieDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      {
        path: "/:id",
        element: <MovieDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
