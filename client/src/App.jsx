import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import LandingPage from "./pages/landing-page";
import MainSidebar from "./layouts/MainSidebar";
import Home from "./pages/home";
import StoryNav from "./pages/story/StoryNav";
import WriteStory from "./pages/story/WriteStory";
import PublishedStory from "./pages/story/PublishedStory";
import StoryPage from "./components/StoryPage";
import Favorite from "./pages/story/Favorite";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/signup" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />

        {/* Main app layout */}
        <Route element={<MainSidebar />}>
          <Route path="/home" element={<Home />} />

          {/* Dynamic page for stories */}
          <Route path="/read-story/:id" element={<StoryPage />} />

          {/* Story section */}
          <Route path="/story" element={<StoryNav />}>
            {/* Redirect /story to /story/write-story */}
            <Route index element={<Navigate to="write-story" replace />} />
            <Route path="write-story" element={<WriteStory />} />
            <Route path="published-stories" element={<PublishedStory />} />
            <Route path="favorite-stories" element={<Favorite />} />
          </Route>
        </Route>

        {/* Optional: catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
