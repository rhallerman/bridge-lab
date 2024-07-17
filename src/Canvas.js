import React, { useEffect, useRef } from "react";

const Canvas = ({
  clearCanvasOnChange,
  pastSelections = [],
  start,
  end,
  ...props
}) => {
  const canvasRef = useRef();

  const clearCanvas = (canvas, context) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const drawSelection = (canvas, context, start, end) => {
    context.fillStyle = "rgba(0, 0, 255, 0.3)";
    context.strokeStyle = "rgba(0, 0, 255, 0.4)";
    context.strokeWidth = 1;
    if (clearCanvasOnChange) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
    context.fillRect(
      start[0] * canvas.width,
      start[1] * canvas.height,
      (end[0] - start[0]) * canvas.width,
      (end[1] - start[1]) * canvas.height
    );
    context.strokeRect(
      start[0] * canvas.width,
      start[1] * canvas.height,
      (end[0] - start[0]) * canvas.width,
      (end[1] - start[1]) * canvas.height
    );
  };

  useEffect(() => {
    if (pastSelections.length > 0) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      clearCanvas(canvas, context);
      for (const selection of pastSelections) {
        drawSelection(canvas, context, selection[0], selection[1]);
      }
    }
  }, [pastSelections]);

  useEffect(() => {
    if (start && end) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      drawSelection(canvas, context, start, end);
    }
  }, [start, end]);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
