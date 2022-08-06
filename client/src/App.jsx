import React from "react";
import Content from "./components/Content";
import { ImagesProvider } from "./context/ImagesProvider";

const App = () => {
  return (
    <ImagesProvider>
      <Content />
    </ImagesProvider>
  );
};

export default App;
