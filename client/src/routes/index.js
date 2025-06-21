import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login";
import AppLayout from "../components/appLayout";
import HomePage from "../pages/home";
import FolderPage from "../pages/folder";
import SearchPage from "../pages/search";
import PrivateRoute from "../components/privateRoute";
import GlobalLayout from "../components/globalLayout";
import { FoldersProvider } from "../context/foldersContext";

const AppRoutes = () => (
  <GlobalLayout>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/app"
        element={
          <PrivateRoute>
            <FoldersProvider>
              <AppLayout />
            </FoldersProvider>
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path=":folderId" element={<FolderPage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  </GlobalLayout>
);

export default AppRoutes;
