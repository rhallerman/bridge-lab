import React, { useEffect, useRef } from "react";

const RenderedVideo = ({ srcObject }) => {
  const refVideo = useRef(null);

  useEffect(() => {
    if (!refVideo.current) return;
    refVideo.current.srcObject = srcObject;
    refVideo.current.play();
  }, [srcObject]);

  return <video style={{ display: "flex", width: "100%" }} ref={refVideo} />;
};

export default RenderedVideo;
