import React, { useEffect, useRef, useState } from "react";

const DrawCanvas = () => {
  const canvasRef0 = useRef();
  const canvasRef1 = useRef();

  const [shouldDraw, setShouldDraw] = useState(false);
  const shouldDrawRef = useRef();
  shouldDrawRef.current = shouldDraw;

  const setLineProperties = (context0, context1) => {
    context0.fillStyle = "rgb(0, 0, 255)";
    context0.strokeStyle = "rgb(0, 0, 255)";
    context0.lineWidth = 1;
    context0.lineJoin = "round";
    context0.lineCap = "round";

    context1.fillStyle = "rgb(0, 255, 255)";
    context1.strokeStyle = "rgb(0, 255, 255)";
    context1.lineWidth = 1;
    context1.lineJoin = "round";
    context1.lineCap = "round";
  };

  const start = (event, context0, context1) => {
    setShouldDraw(true);
    let elementRect = event.target.getBoundingClientRect();

    context0.beginPath();
    context0.moveTo(
      event.clientX - elementRect.left,
      event.clientY - elementRect.top
    );

    context1.beginPath();
    context1.moveTo(
      event.clientX - elementRect.left,
      event.clientY - elementRect.top
    );
  };

  const move = (event, context0, context1) => {
    if (shouldDrawRef.current) {
      let elementRect = event.target.getBoundingClientRect();
      const xCoord =
        event.type === "touchmove"
          ? event.changedTouches[0].clientX
          : event.clientX;
      const yCoord =
        event.type === "touchmove"
          ? event.changedTouches[0].clientY
          : event.clientY;

      context0.lineTo(xCoord - elementRect.left, yCoord - elementRect.top);
      context0.stroke();

      context1.lineTo(xCoord - elementRect.left, yCoord - elementRect.top);
      context1.stroke();
    }
  };

  const end = () => {
    setShouldDraw(false);
  };

  useEffect(() => {
    const canvas0 = canvasRef0.current;
    const context0 = canvas0.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect0 = canvas0.getBoundingClientRect();
    canvas0.width = rect0.width * dpr;
    canvas0.height = rect0.height * dpr;
    context0.scale(dpr, dpr);
    canvas0.addEventListener("mousedown", (e) => start(e, context0));
    canvas0.addEventListener("touchstart", (e) => start(e, context0));
    canvas0.addEventListener("mousemove", (e) => move(e, context0));
    canvas0.addEventListener("touchmove", (e) => move(e, context0));
    canvas0.addEventListener("mouseup", () => end());
    canvas0.addEventListener("touchend", () => end());

    const canvas1 = canvasRef1.current;
    const context1 = canvas1.getContext("2d");
    const rect1 = canvas1.getBoundingClientRect();
    canvas1.width = rect1.width * dpr;
    canvas1.height = rect1.height * dpr;
    context1.scale(dpr, dpr);
    canvas1.addEventListener("mousedown", (e) => start(e, context1));
    canvas1.addEventListener("touchstart", (e) => start(e, context1));
    canvas1.addEventListener("mousemove", (e) => move(e, context1));
    canvas1.addEventListener("touchmove", (e) => move(e, context1));
    canvas1.addEventListener("mouseup", () => end());
    canvas1.addEventListener("touchend", () => end());

    setLineProperties(context0, context1);
  }, []);

  return (
    <>
      <canvas ref={canvasRef0} />
      <canvas ref={canvasRef1} />
    </>
  );
};

export default DrawCanvas;
