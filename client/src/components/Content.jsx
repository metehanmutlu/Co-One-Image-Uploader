import React from "react";
import { useImages } from "../context/ImagesProvider";
import Body from "./Body";
import Header from "./Header";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";

const Content = () => {
  const { isLoading } = useImages();

  return (
    <div className="container noselect">
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Spinner color="white" size={40} />
        </div>
      ) : (
        <>
          <Header />
          <Body />
        </>
      )}
    </div>
  );
};

export default Content;
