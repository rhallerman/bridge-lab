import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import Control from "./Control/Control";
import ReactDOM from "react-dom";
import View from "./View/View";
// import { Cloudinary } from "@cloudinary/url-gen";
import atlantaLogo from "./Images/Atlanta.png";
// import { Blob } from "buffer";

const copyStyles = (sourceDoc, targetDoc) => {
  sourceDoc.head.querySelectorAll("link, style").forEach((htmlElement) => {
    targetDoc.head.appendChild(htmlElement.cloneNode(true));
  });
};

const App = () => {
  // const cld = new Cloudinary({ cloud: { cloudName: "dpm9xofa3" } });

  // useEffect(() => {
  // const createFile = async (path, name, type) => {
  //   let response = await fetch(path);
  //   let data = await response.blob();
  //   let metadata = {
  //     type: type,
  //   };
  //   return new File([data], name, metadata);
  // };

  // const getBase64 = (file) => {
  //   var reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     return reader.result;
  //   };
  //   reader.onerror = function (error) {
  //     console.log("Error: ", error);
  //   };
  // };

  // createFile("./Images/Atlanta.png", "Atlanta.png", "image/png").then(
  //   async (file) => {
  //     const file64 = await getBase64(file);
  //     uploadFile(file64);
  //   }
  // );
  // }, []);

  const [controlView, setControlView] = useState(null);

  useEffect(() => {
    setControlView(window.open());
  }, []);

  useEffect(() => {
    console.log(controlView);
    if (controlView?.document?.body) {
      copyStyles(document, controlView.document);
    }
  }, [controlView?.document]);

  const controlViewWindow = useMemo(() => {
    if (controlView?.document?.body) {
      return ReactDOM.createPortal(
        <Control controlView={controlView} />,
        controlView.document.body
      );
    } else return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlView]);

  return (
    <>
      <View />
      {controlViewWindow}
    </>
  );
};

export default App;
