import React from "react";
import PostsComponent from "./components/PostsComponent";
import SearchComponent from "./components/SearchComponent";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <SearchComponent />
      <PostsComponent />
    </div>
  );
};

export default App;
