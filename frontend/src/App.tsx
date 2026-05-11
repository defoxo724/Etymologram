import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "./components/layout/Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import WordCrudComponent from "./components/word/crud/WordCrudComponent";
import LanguageCrudComponent from "./components/word/language/LanguageCrudComponent";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<div />} />
            <Route path="/word-crud" element={<WordCrudComponent />} />
            <Route path="/language-crud" element={<LanguageCrudComponent />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
