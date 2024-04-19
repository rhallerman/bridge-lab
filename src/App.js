import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import View from "./View/View";
import Control from "./Control/Control";
import ReactDOM from "react-dom";

function copyStyles(sourceDoc, targetDoc) {
  Array.from(sourceDoc.styleSheets).forEach((styleSheet) => {
    if (styleSheet.cssRules) {
      // for <style> elements
      const newStyleEl = sourceDoc.createElement("style");

      Array.from(styleSheet.cssRules).forEach((cssRule) => {
        // write the text of each rule into the body of the style element
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
      });

      targetDoc.head.appendChild(newStyleEl);
    } else if (styleSheet.href) {
      // for <link> elements loading CSS from a URL
      const newLinkEl = sourceDoc.createElement("link");

      newLinkEl.rel = "stylesheet";
      newLinkEl.href = styleSheet.href;
      targetDoc.head.appendChild(newLinkEl);
    }
  });
}

function App() {
  const [controlView, setControlView] = useState(null);

  useEffect(() => {
    setControlView(window.open());
  }, []);

  useEffect(() => {
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
      <View editable={false} />
      {controlViewWindow}
    </>
  );
}

export default App;
