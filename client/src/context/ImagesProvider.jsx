import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axios";

const ImagesContext = createContext();

export const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchImages = async () => {
    const response = await axios.get("/images");
    setIsLoading(false);
    setImages(response.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const values = {
    images,
    setImages,
    isLoading,
  };

  return (
    <ImagesContext.Provider value={values}>{children}</ImagesContext.Provider>
  );
};

export const useImages = () => useContext(ImagesContext);
