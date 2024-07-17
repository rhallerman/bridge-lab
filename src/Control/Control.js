import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./Control.css";
import "../View/View.css";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Switch,
  ThemeProvider,
  Tooltip,
  Zoom,
  createTheme,
} from "@mui/material";
import { Context } from "../Context/Context";
import View from "../View/View";
import input from "../Input/Input.json";
import {
  setDBReality,
  setDBMode,
  setDBAssignTo,
  setDBTypedSuit,
  setDBTypedRank,
  setDBLockedBy,
} from "../View/FirebaseModule";
import ColorThief from "colorthief";
// import _ from "lodash";
import orientate from "../Images/orientate.png";
import RenderedVideo from "../RenderedVideo";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
import Canvas from "../Canvas";
import _ from "lodash";

const theme = createTheme({
  typography: {
    fontSize: 10,
  },
});

const Control = ({ kibView, videoChatContainer, database, accessToken }) => {
  let {
    setDeck,
    hands,
    handsRef,
    setHands,
    handsDup,
    playedCards,
    reality,
    mode,
    setMode,
    assignTo,
    setAssignTo,
    history,
    typedSuit,
    setTypedSuit,
    typedRank,
    setTypedRank,
    site,
    broadcastType,
    setBroadcastType,
    showPlayedCards,
    setShowPlayedCards,
    auction,
    setAuction,
    auctionRef,
    liveEvents,
    realityOn,
    realityOff,
    back,
    forward,
    bid,
    play,
    assign,
    unassign,
    trade,
    shape,
    setShape,
    username,
    connectedUser,
    lockedBy,
    setLockedBy,
    videoRef,
    setVideo,
    calibrationImage,
    setCalibrationImage,
    setCaptureStream,
    boardNumRef,
    setBoardNum,
    visionToRank,
    whoseTurnRef,
    setWhoseTurn,
    setLeader,
    contractLevelRef,
    setContractLevel,
    setContractDbl,
    setDeclarer,
    strToDirection,
    setContractSuit,
    calibrationOpen,
    setCalibrationOpen,
    startHand00,
    setStartHand00,
    endHand00,
    setEndHand00,
    endHand00Ref,
    startHand01,
    setStartHand01,
    endHand01,
    setEndHand01,
    endHand01Ref,
    startHand02,
    setStartHand02,
    endHand02,
    setEndHand02,
    endHand02Ref,
    startHand03,
    setStartHand03,
    endHand03,
    setEndHand03,
    endHand03Ref,
    startName0,
    setStartName0,
    endName0,
    setEndName0,
    endName0Ref,
    startHand10,
    setStartHand10,
    endHand10,
    setEndHand10,
    endHand10Ref,
    startHand11,
    setStartHand11,
    endHand11,
    setEndHand11,
    endHand11Ref,
    startHand12,
    setStartHand12,
    endHand12,
    setEndHand12,
    endHand12Ref,
    startHand13,
    setStartHand13,
    endHand13,
    setEndHand13,
    endHand13Ref,
    startName1,
    setStartName1,
    endName1,
    setEndName1,
    endName1Ref,
    startHand20,
    setStartHand20,
    endHand20,
    setEndHand20,
    endHand20Ref,
    startHand21,
    setStartHand21,
    endHand21,
    setEndHand21,
    endHand21Ref,
    startHand22,
    setStartHand22,
    endHand22,
    setEndHand22,
    endHand22Ref,
    startHand23,
    setStartHand23,
    endHand23,
    setEndHand23,
    endHand23Ref,
    startName2,
    setStartName2,
    endName2,
    setEndName2,
    endName2Ref,
    startHand30,
    setStartHand30,
    endHand30,
    setEndHand30,
    endHand30Ref,
    startHand31,
    setStartHand31,
    endHand31,
    setEndHand31,
    endHand31Ref,
    startHand32,
    setStartHand32,
    endHand32,
    setEndHand32,
    endHand32Ref,
    startHand33,
    setStartHand33,
    endHand33,
    setEndHand33,
    endHand33Ref,
    startName3,
    setStartName3,
    endName3,
    setEndName3,
    endName3Ref,
    startContractDirection,
    setStartContractDirection,
    endContractDirection,
    setEndContractDirection,
    endContractDirectionRef,
    setNorthName,
    northNameRef,
    setEastName,
    eastNameRef,
    setSouthName,
    southNameRef,
    setWestName,
    westNameRef,
    startBoardNum,
    setStartBoardNum,
    endBoardNum,
    setEndBoardNum,
    endBoardNumRef,
    startAuction,
    setStartAuction,
    startAuctionRef,
    endAuction,
    setEndAuction,
    endAuctionRef,
    setTrump,
    resetAll,
  } = useContext(Context);

  const colorThief = new ColorThief();

  const [boardNumLastImg, setBoardNumLastImg] = useState(null);
  const [bidLastImg, setBidLastImg] = useState(null);
  const [hand00LastImg, setHand00LastImg] = useState(null);
  const [hand01LastImg, setHand01LastImg] = useState(null);
  const [hand02LastImg, setHand02LastImg] = useState(null);
  const [hand03LastImg, setHand03LastImg] = useState(null);
  const [hand10LastImg, setHand10LastImg] = useState(null);
  const [hand11LastImg, setHand11LastImg] = useState(null);
  const [hand12LastImg, setHand12LastImg] = useState(null);
  const [hand13LastImg, setHand13LastImg] = useState(null);
  const [hand20LastImg, setHand20LastImg] = useState(null);
  const [hand21LastImg, setHand21LastImg] = useState(null);
  const [hand22LastImg, setHand22LastImg] = useState(null);
  const [hand23LastImg, setHand23LastImg] = useState(null);
  const [hand30LastImg, setHand30LastImg] = useState(null);
  const [hand31LastImg, setHand31LastImg] = useState(null);
  const [hand32LastImg, setHand32LastImg] = useState(null);
  const [hand33LastImg, setHand33LastImg] = useState(null);

  const boardNumLastImgRef = useRef();
  const bidLastImgRef = useRef();
  const hand00LastImgRef = useRef();
  const hand01LastImgRef = useRef();
  const hand02LastImgRef = useRef();
  const hand03LastImgRef = useRef();
  const hand10LastImgRef = useRef();
  const hand11LastImgRef = useRef();
  const hand12LastImgRef = useRef();
  const hand13LastImgRef = useRef();
  const hand20LastImgRef = useRef();
  const hand21LastImgRef = useRef();
  const hand22LastImgRef = useRef();
  const hand23LastImgRef = useRef();
  const hand30LastImgRef = useRef();
  const hand31LastImgRef = useRef();
  const hand32LastImgRef = useRef();
  const hand33LastImgRef = useRef();

  boardNumLastImgRef.current = boardNumLastImg;
  bidLastImgRef.current = bidLastImg;
  hand00LastImgRef.current = hand00LastImg;
  hand01LastImgRef.current = hand01LastImg;
  hand02LastImgRef.current = hand02LastImg;
  hand03LastImgRef.current = hand03LastImg;
  hand10LastImgRef.current = hand10LastImg;
  hand11LastImgRef.current = hand11LastImg;
  hand12LastImgRef.current = hand12LastImg;
  hand13LastImgRef.current = hand13LastImg;
  hand20LastImgRef.current = hand20LastImg;
  hand21LastImgRef.current = hand21LastImg;
  hand22LastImgRef.current = hand22LastImg;
  hand23LastImgRef.current = hand23LastImg;
  hand30LastImgRef.current = hand30LastImg;
  hand31LastImgRef.current = hand31LastImg;
  hand32LastImgRef.current = hand32LastImg;
  hand33LastImgRef.current = hand33LastImg;

  const createCanvas = (width, height) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    // canvas.width = videoRef.current.videoWidth;
    // canvas.height = videoRef.current.videoHeight;
    return canvas;
  };

  const getPalette = (canvas, leftCrop, topCrop, width, height, render) => {
    canvas
      .getContext("2d")
      .drawImage(
        videoRef.current,
        leftCrop,
        topCrop,
        width,
        height,
        0,
        0,
        width,
        height
      );
    if (render) document.body.appendChild(canvas);
    const frame = canvas.toDataURL();
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = frame;
      img.onload = () => resolve(colorThief.getPalette(img, 5));
    });
  };

  const getVision = async (
    canvas,
    leftCrop,
    topCrop,
    width,
    height,
    type,
    singleCard,
    render,
    lastImg,
    setLastImg,
    returnOCR
  ) => {
    canvas
      .getContext("2d")
      .drawImage(
        videoRef.current,
        leftCrop,
        topCrop,
        width,
        height,
        0,
        0,
        width,
        height
      );
    if (singleCard) {
      const orientationImage = new Image();
      orientationImage.src = orientate;
      canvas.getContext("2d").drawImage(orientationImage, width, 0);
    }
    if (render) {
      document.body.appendChild(canvas);
    }
    const frame = canvas.toDataURL();
    if (returnOCR) {
      if (frame !== lastImg) {
        if (setLastImg !== undefined) {
          setLastImg(frame);
        }
        const ocr = await fetch(
          "https://vision.googleapis.com/v1/images:annotate",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "x-goog-user-project": "kibsync-bfc9f",
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
              requests: [
                {
                  image: { content: frame.substring(22) },
                  features: [{ maxResults: 50, type: type }],
                  imageContext: {
                    languageHints: ["en-t-i0-handwrit"],
                  },
                },
              ],
            }),
          }
        );
        return ocr
          .json()
          .then(
            (response) => response.responses[0].fullTextAnnotation?.text ?? ""
          );
      } else {
        return undefined;
      }
    } else {
      if (frame !== lastImg && setLastImg !== undefined) {
        setLastImg(frame);
      }
      return frame !== lastImg;
    }
  };

  const PROJECT_ID = "69484809608";
  const ENDPOINT_ID = "3163723762646384640";
  const INPUT_DATA_FILE = {
    instances: [
      {
        content: "YOUR_IMAGE_BYTES",
      },
    ],
    parameters: {
      confidenceThreshold: 0.5,
      maxPredictions: 5,
    },
  };

  const getPrediction = async (
    canvas,
    leftCrop,
    topCrop,
    width,
    height,
    type,
    singleCard,
    render
  ) => {
    canvas
      .getContext("2d")
      .drawImage(
        videoRef.current,
        leftCrop,
        topCrop,
        width,
        height,
        0,
        0,
        width,
        height
      );
    if (render) {
      document.body.appendChild(canvas);
    }
    const frame = canvas.toDataURL().split(",")[1];
    // const request = await fetch(
    //   `https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/endpoints/${ENDPOINT_ID}:predict`,
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //       // "x-goog-user-project": "kibsync-bfc9f",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       instances: [
    //         {
    //           content: frame,
    //         },
    //       ],
    //     }),
    //   }
    // );
    // return request.json().then((parsedResponse) => {
    //   const predictions = parsedResponse.predictions[0];
    //   let highestConfidence = 0;
    //   let highestConfidenceIdx = 0;
    //   for (let i = 0; i < predictions.confidences.length; i++) {
    //     if (predictions.confidences[i] > highestConfidence) {
    //       highestConfidence = predictions.confidences[i];
    //       highestConfidenceIdx = i;
    //     }
    //   }
    //   const predictedSuit = predictions.displayNames[highestConfidenceIdx];
    //   return predictedSuit === "s"
    //     ? 0
    //     : predictedSuit === "h"
    //     ? 1
    //     : predictedSuit === "d"
    //     ? 2
    //     : predictedSuit === "c"
    //     ? 3
    //     : -1;
    // });
  };

  // const closeCaptureStream = (captureStream) => {
  //   captureStream.getTracks().forEach((track) => track.stop());
  // };

  const calibrateArea = async (start, end, lastImg, setLastImg) => {
    const left = start[0] * videoRef.current.videoWidth;
    const width = (end[0] - start[0]) * videoRef.current.videoWidth;
    const top = start[1] * videoRef.current.videoHeight;
    const height = (end[1] - start[1]) * videoRef.current.videoHeight;
    const canvas = createCanvas(width, height);
    const vision = await getVision(
      canvas,
      left,
      top,
      width,
      height,
      "TEXT_DETECTION",
      false,
      false,
      lastImg,
      setLastImg,
      true
    );
    console.log(vision);
    const palette = await getPalette(canvas, left, top, width, height, false);
    return { vision, palette };
    // else {
    //   return getPrediction(
    //     canvas,
    //     left,
    //     top,
    //     width,
    //     height,
    //     "TEXT_DETECTION",
    //     false,
    //     true
    //   );
    // }
  };

  // for LoveBridge
  // const paletteToSuit = (palette) => {
  //   for (const color of palette) {
  //     const [r, g, b] = color;
  //     if (r >= 171 && r <= 190 && g >= 70 && g <= 81 && b >= 55 && b <= 68)
  //       return 1;
  //     if (r >= 230 && r <= 240 && g >= 140 && g <= 150 && b >= 60 && b <= 75)
  //       return 2;
  //     if (r >= 40 && r <= 55 && g >= 100 && g <= 140 && b >= 85 && b <= 100)
  //       return 3;
  //     if (r >= 5 && r <= 20 && g >= 5 && g <= 20 && b >= 5 && b <= 20) return 0;
  //   }
  // };

  // for LoveBridge
  // const correctVisionRank = (response) => {
  //   let vision = response.responses[0].fullTextAnnotation?.text;
  //   vision = vision
  //     ?.replaceAll("\n", "")
  //     .replaceAll(" ", "")
  //     .replaceAll("$", "")
  //     .replaceAll("orientate", "");
  //   if (vision === "6%") {
  //     return "9";
  //   } else if (vision === "9%") {
  //     return "6";
  //   } else if (vision === "8+") {
  //     return "8";
  //   } else {
  //     return vision?.slice(-1);
  //   }
  // };

  const bboVisionToSuit = (vision, palette) => {
    vision = vision.replaceAll(" ", "");
    if (["N", "NT"].includes(vision)) return -1;
    if (["♦", "◆", "+", ".", "->"].includes(vision)) return 2;
    if (["♥"].includes(vision)) return 1;
    if (["%", "0", "0%", "of"].includes(vision)) return 3;
    if (["4", "A", ""].includes(vision)) {
      if (
        palette?.some(
          (color) => color[0] > 150 && color[1] < 50 && color[2] < 50
        )
      ) {
        return 2;
      } else {
        return 0;
      }
    }
    return "Error";
  };

  const initializeVision = async () => {
    const tempCaptureStream = await navigator.mediaDevices.getDisplayMedia();
    const tempCalibrationImage = (
      <RenderedVideo
        srcObject={tempCaptureStream}
        style={{ position: "absolute" }}
      />
    );
    setCaptureStream(tempCaptureStream);
    setCalibrationImage(tempCalibrationImage);
    const tempVideo = document.createElement("video");
    tempVideo.srcObject = tempCaptureStream;
    await tempVideo.play();
    setVideo(tempVideo);
    if (window.localStorage.getItem("KibSync settings") === "true") {
      const getStoredMouseLocation = (name) => {
        return window.localStorage
          .getItem(name)
          .split(",")
          .map((str) => parseFloat(str));
      };
      setStartHand00(getStoredMouseLocation("startHand00"));
      setEndHand00(getStoredMouseLocation("endHand00"));
      setStartHand01(getStoredMouseLocation("startHand01"));
      setEndHand01(getStoredMouseLocation("endHand01"));
      setStartHand02(getStoredMouseLocation("startHand02"));
      setEndHand02(getStoredMouseLocation("endHand02"));
      setStartHand03(getStoredMouseLocation("startHand03"));
      setEndHand03(getStoredMouseLocation("endHand03"));
      setStartName0(getStoredMouseLocation("startName0"));
      setEndName0(getStoredMouseLocation("endName0"));
      setStartHand10(getStoredMouseLocation("startHand10"));
      setEndHand10(getStoredMouseLocation("endHand10"));
      setStartHand11(getStoredMouseLocation("startHand11"));
      setEndHand11(getStoredMouseLocation("endHand11"));
      setStartHand12(getStoredMouseLocation("startHand12"));
      setEndHand12(getStoredMouseLocation("endHand12"));
      setStartHand13(getStoredMouseLocation("startHand13"));
      setEndHand13(getStoredMouseLocation("endHand13"));
      setStartName1(getStoredMouseLocation("startName1"));
      setEndName1(getStoredMouseLocation("endName1"));
      setStartHand20(getStoredMouseLocation("startHand20"));
      setEndHand20(getStoredMouseLocation("endHand20"));
      setStartHand21(getStoredMouseLocation("startHand21"));
      setEndHand21(getStoredMouseLocation("endHand21"));
      setStartHand22(getStoredMouseLocation("startHand22"));
      setEndHand22(getStoredMouseLocation("endHand22"));
      setStartHand23(getStoredMouseLocation("startHand23"));
      setEndHand23(getStoredMouseLocation("endHand23"));
      setStartName2(getStoredMouseLocation("startName2"));
      setEndName2(getStoredMouseLocation("endName2"));
      setStartHand30(getStoredMouseLocation("startHand30"));
      setEndHand30(getStoredMouseLocation("endHand30"));
      setStartHand31(getStoredMouseLocation("startHand31"));
      setEndHand31(getStoredMouseLocation("endHand31"));
      setStartHand32(getStoredMouseLocation("startHand32"));
      setEndHand32(getStoredMouseLocation("endHand32"));
      setStartHand33(getStoredMouseLocation("startHand33"));
      setEndHand33(getStoredMouseLocation("endHand33"));
      setStartName3(getStoredMouseLocation("startName3"));
      setEndName3(getStoredMouseLocation("endName3"));
      setStartContractDirection(
        getStoredMouseLocation("startContractDirection")
      );
      setEndContractDirection(getStoredMouseLocation("endContractDirection"));
      setStartBoardNum(getStoredMouseLocation("startBoardNum"));
      setEndBoardNum(getStoredMouseLocation("endBoardNum"));
      setStartAuction(getStoredMouseLocation("startAuction"));
      setEndAuction(getStoredMouseLocation("endAuction"));
    }
    setCalibrationOpen(true);
  };

  const getHandInfo = () => {
    setHandsFromCalibration();
    setNamesFromCalibration();
    setBoardNumFromCalibration();
  };

  // let counter = 0;
  const bidPlayTimer = () => {
    setTimeout(async () => {
      if (
        handsRef.current[0].length +
          handsRef.current[1].length +
          handsRef.current[2].length +
          handsRef.current[3].length >
          0 &&
        whoseTurnRef.current !== null
      ) {
        if (contractLevelRef.current === null) {
          setBidFromCalibration();
        } else {
          setCardFromCalibration();
        }
      }
      const left = startBoardNum[0] * videoRef.current.videoWidth;
      const width =
        (endBoardNum[0] - startBoardNum[0]) * videoRef.current.videoWidth;
      const top = startBoardNum[1] * videoRef.current.videoHeight;
      const height =
        (endBoardNum[1] - startBoardNum[1]) * videoRef.current.videoHeight;
      const canvas = createCanvas(width, height);
      if (boardNumRef.current !== "") {
        const isNextBoardNum = await getVision(
          canvas,
          left,
          top,
          width,
          height,
          "TEXT_DETECTION",
          false,
          false,
          boardNumLastImgRef.current,
          setBoardNumLastImg,
          false
        );
        if (isNextBoardNum) {
          resetAll();
          getHandInfo();
        }
      }
      bidPlayTimer();
    }, 500);
  };

  useEffect(() => {
    if (accessToken && endAuctionRef.current) {
      getHandInfo();
      bidPlayTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, endAuctionRef.current]);

  const captureButton = (
    <Button onClick={async () => await initializeVision()}>
      Select Capture
    </Button>
  );

  const siteGroup = (
    <FormControl className="radioGroupHeader">
      <FormLabel>Bridge site:</FormLabel>
      <RadioGroup
        row
        value={site}
        onChange={(event) => setBroadcastType(event.target.value)}
      >
        <FormControlLabel
          value="BBO"
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label="BBO"
          sx={{ marginLeft: "0px" }}
        />
      </RadioGroup>
    </FormControl>
  );

  const broadcastTypeGroup = (
    <FormControl className="radioGroupHeader">
      <FormLabel>Broadcast type:</FormLabel>
      <RadioGroup
        row
        value={broadcastType}
        onChange={(event) => setBroadcastType(event.target.value)}
      >
        <Tooltip
          title="The event will continue to play live during analysis."
          enterTouchDelay={0}
        >
          <FormControlLabel
            value="stream"
            control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
            label="Stream"
            sx={{ marginLeft: "0px" }}
          />
        </Tooltip>
        <Tooltip
          title="The event will pause during analysis."
          enterTouchDelay={0}
        >
          <FormControlLabel
            value="video"
            control={
              <Radio
                disabled={true}
                sx={{ paddingTop: "0px", paddingBottom: "0px" }}
              />
            }
            label="Video"
            sx={{ marginLeft: "0px" }}
          />
        </Tooltip>
      </RadioGroup>
    </FormControl>
  );

  const lockedBySwitch = (
    <FormControlLabel
      control={
        <Switch
          checked={!!lockedBy}
          onChange={(event) => {
            if (event.target.checked) {
              if (connectedUser)
                setDBLockedBy(connectedUser, database, username, username);
              setLockedBy(username);
            } else {
              if (connectedUser)
                setDBLockedBy(connectedUser, database, username, null);
              setLockedBy(null);
            }
          }}
        />
      }
      label={
        lockedBy ? (
          `Locked by ${lockedBy}`
        ) : (
          <>
            <u>L</u>ock
          </>
        )
      }
      disabled={lockedBy && lockedBy !== username}
    />
  );

  const analysisSwitch = (
    <FormControlLabel
      control={
        <Switch
          checked={!reality}
          onChange={(event) => {
            if (event.target.checked) {
              if (connectedUser) {
                setDBLockedBy(connectedUser, database, username, username);
                setDBReality(connectedUser, database, username, false);
              }
              setLockedBy(username);
              realityOff();
            } else {
              if (connectedUser) {
                setDBReality(connectedUser, database, username, true);
              }
              realityOn();
            }
          }}
        />
      }
      label={
        <>
          Analysis mode (<u> </u>)
        </>
      }
      disabled={lockedBy && lockedBy !== username}
    />
  );

  const showPlayedCardsSwitch = (
    <FormControlLabel
      control={
        <Switch
          checked={showPlayedCards}
          onChange={(event) => setShowPlayedCards(event.target.checked)}
          disabled={reality}
        />
      }
      label="Show played cards"
      disabled={lockedBy && lockedBy !== username}
    />
  );

  const modeGroup = (
    <FormControl
      disabled={reality || (lockedBy && lockedBy !== username)}
      className="radioGroupHeader"
    >
      <FormLabel>Mode:</FormLabel>
      <RadioGroup
        value={mode}
        onChange={(event) => {
          if (connectedUser)
            setDBMode(connectedUser, database, username, event.target.value);
          setMode(event.target.value);
        }}
      >
        <FormControlLabel
          value="play"
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>P</u>lay
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value="assign"
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>A</u>ssign
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value="unassign"
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>U</u>nassign
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value="trade"
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>T</u>rade
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value="shape"
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              Shape (<u>x</u>)
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
      </RadioGroup>
    </FormControl>
  );

  const assignToGroup = (
    <FormControl
      disabled={reality || (lockedBy && lockedBy !== username)}
      className="radioGroupHeader"
    >
      <FormLabel>Player:</FormLabel>
      <RadioGroup
        value={assignTo}
        onChange={(event) => {
          if (connectedUser)
            setDBAssignTo(
              connectedUser,
              database,
              username,
              event.target.value
            );
          setAssignTo(event.target.value);
        }}
      >
        <FormControlLabel
          value={0}
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>N</u>orth
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value={1}
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>E</u>ast
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value={2}
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>S</u>outh
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value={3}
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>W</u>est
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
      </RadioGroup>
    </FormControl>
  );

  const suitGroup = (
    <FormControl
      disabled={reality || (lockedBy && lockedBy !== username)}
      className="radioGroupHeader"
    >
      <FormLabel>Suit:</FormLabel>
      <RadioGroup
        value={typedSuit}
        onChange={(event) => {
          if (connectedUser)
            setDBTypedSuit(
              connectedUser,
              database,
              username,
              event.target.value
            );
          setTypedSuit(event.target.value);
        }}
      >
        <FormControlLabel
          value={0}
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>s</u>pade
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value={1}
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>h</u>eart
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value={2}
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>d</u>iamond
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value={3}
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>c</u>lub
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
      </RadioGroup>
    </FormControl>
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "BODY") {
        if (e.key === "ArrowRight") {
          if (!reality && liveEvents.length < input.events.length) {
            forward();
          }
        } else if (e.key === "ArrowLeft") {
          if (!reality) {
            back();
          }
        } else if (e.key === " ") {
          reality ? realityOff() : realityOn();
        } else if (e.key === "P") {
          if (!reality) setMode("play");
        } else if (e.key === "A") {
          if (!reality) setMode("assign");
        } else if (e.key === "U") {
          if (!reality) setMode("unassign");
        } else if (e.key === "T") {
          if (!reality) setMode("trade");
        } else if (e.key === "x") {
          if (!reality) setMode("shape");
        } else if (e.key === "N") {
          if (["assign", "shape"].includes(mode)) {
            setAssignTo(0);
            if (connectedUser)
              setDBAssignTo(connectedUser, database, username, 0);
          }
        } else if (e.key === "S") {
          if (["assign", "shape"].includes(mode)) {
            setAssignTo(2);
            if (connectedUser)
              setDBAssignTo(connectedUser, database, username, 2);
          }
        } else if (e.key === "W") {
          if (["assign", "shape"].includes(mode)) {
            setAssignTo(3);
            if (connectedUser)
              setDBAssignTo(connectedUser, database, username, 3);
          }
        } else if (e.key === "E") {
          if (["assign", "shape"].includes(mode)) {
            setAssignTo(1);
            if (connectedUser)
              setDBAssignTo(connectedUser, database, username, 1);
          }
        } else if (e.key === "s") {
          setTypedSuit(0);
          if (connectedUser)
            setDBTypedSuit(connectedUser, database, username, 0);
        } else if (e.key === "h") {
          setTypedSuit(1);
          if (connectedUser)
            setDBTypedSuit(connectedUser, database, username, 1);
        } else if (e.key === "d") {
          setTypedSuit(2);
          if (connectedUser)
            setDBTypedSuit(connectedUser, database, username, 2);
        } else if (e.key === "c") {
          setTypedSuit(3);
          if (connectedUser)
            setDBTypedSuit(connectedUser, database, username, 3);
        } else if (e.key === "a") {
          if (typedSuit !== null) {
            setTypedRank(0);
            if (connectedUser)
              setDBTypedRank(connectedUser, database, username, 0);
          }
        } else if (e.key === "k") {
          if (typedSuit !== null) {
            setTypedRank(1);
            if (connectedUser)
              setDBTypedRank(connectedUser, database, username, 1);
          }
        } else if (e.key === "q") {
          if (typedSuit !== null) {
            setTypedRank(2);
            if (connectedUser)
              setDBTypedRank(connectedUser, database, username, 2);
          }
        } else if (e.key === "j") {
          if (typedSuit !== null) {
            setTypedRank(3);
            if (connectedUser)
              setDBTypedRank(connectedUser, database, username, 3);
          }
        } else if (e.key === "t") {
          if (typedSuit !== null) {
            setTypedRank(4);
            if (connectedUser)
              setDBTypedRank(connectedUser, database, username, 4);
          }
        } else if (e.keyCode >= 48 && e.keyCode <= 57) {
          if (
            ["play", "assign", "unassign", "trade"].includes(mode) &&
            e.keyCode >= 50 &&
            e.keyCode <= 57
          ) {
            // 2 - 9
            if (typedSuit !== null) {
              setTypedRank(62 - e.keyCode);
              if (connectedUser)
                setDBTypedRank(
                  connectedUser,
                  database,
                  username,
                  62 - e.keyCode
                );
            }
          } else if (mode === "shape") {
            setShape([...shape, parseInt(e.key)]);
          }
          /*
        A = 0
        K = 1
        Q = 2
        J = 3
        T = 4
        9 = 5
        8 = 6
        7 = 7
        6 = 8
        5 = 9
        4 = 10
        3 = 11
        2 = 12
        */
        } else {
          // console.log(e.key);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    if (kibView?.document) {
      kibView.document.addEventListener("keydown", handleKeyDown);
    }
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
      if (kibView?.document)
        kibView.document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hands,
    playedCards,
    history,
    reality,
    mode,
    assignTo,
    typedSuit,
    typedRank,
    auction,
    liveEvents,
    shape,
  ]);

  useEffect(() => {
    if (typedSuit !== null && typedRank !== null) {
      const card = { suit: typedSuit, rank: typedRank };
      if (mode === "assign") {
        assign(card);
      } else {
        const hand = handsDup.findIndex((hand) =>
          hand.some(
            (card) => card.suit === typedSuit && card.rank === typedRank
          )
        );
        if (hand >= 0) {
          card.hand = hand;
          if (mode === "play") {
            play(card, false);
          } else if (mode === "unassign") {
            unassign(card);
          } else if (mode === "trade") {
            trade(card);
          }
        }
      }
      setTypedRank(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedSuit, typedRank, assignTo]);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [pastSelections, setPastSelections] = useState([]);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [endX, setEndX] = useState(null);
  const [endY, setEndY] = useState(null);
  const [loadFromHistory, setLoadFromHistory] = useState(false);

  useEffect(() => {
    if (
      loadFromHistory &&
      window.localStorage.getItem("KibSync settings") === "true"
    ) {
      const getSavedSelection = (selectionNames) => {
        const convertToInt = (coordStr) =>
          coordStr.split(",").map((str) => parseFloat(str));
        return selectionNames.map((name) =>
          convertToInt(window.localStorage.getItem(name))
        );
      };
      const tempPastSelections = [];
      if (startHand00 && endHand00)
        tempPastSelections.push(
          getSavedSelection(["startHand00", "endHand00"])
        );
      if (startHand01 && endHand01)
        tempPastSelections.push(
          getSavedSelection(["startHand01", "endHand01"])
        );
      if (startHand02 && endHand02)
        tempPastSelections.push(
          getSavedSelection(["startHand02", "endHand02"])
        );
      if (startHand03 && endHand03)
        tempPastSelections.push(
          getSavedSelection(["startHand03", "endHand03"])
        );
      if (startName0 && endName0)
        tempPastSelections.push(getSavedSelection(["startName0", "endName0"]));
      if (startHand10 && endHand10)
        tempPastSelections.push(
          getSavedSelection(["startHand10", "endHand10"])
        );
      if (startHand11 && endHand11)
        tempPastSelections.push(
          getSavedSelection(["startHand11", "endHand11"])
        );
      if (startHand12 && endHand12)
        tempPastSelections.push(
          getSavedSelection(["startHand12", "endHand12"])
        );
      if (startHand13 && endHand13)
        tempPastSelections.push(
          getSavedSelection(["startHand13", "endHand13"])
        );
      if (startName1 && endName1)
        tempPastSelections.push(getSavedSelection(["startName1", "endName1"]));
      if (startHand20 && endHand20)
        tempPastSelections.push(
          getSavedSelection(["startHand20", "endHand20"])
        );
      if (startHand21 && endHand21)
        tempPastSelections.push(
          getSavedSelection(["startHand21", "endHand21"])
        );
      if (startHand22 && endHand22)
        tempPastSelections.push(
          getSavedSelection(["startHand22", "endHand22"])
        );
      if (startHand23 && endHand23)
        tempPastSelections.push(
          getSavedSelection(["startHand23", "endHand23"])
        );
      if (startName2 && endName2)
        tempPastSelections.push(getSavedSelection(["startName2", "endName2"]));
      if (startHand30 && endHand30)
        tempPastSelections.push(
          getSavedSelection(["startHand30", "endHand30"])
        );
      if (startHand31 && endHand31)
        tempPastSelections.push(
          getSavedSelection(["startHand31", "endHand31"])
        );
      if (startHand32 && endHand32)
        tempPastSelections.push(
          getSavedSelection(["startHand32", "endHand32"])
        );
      if (startHand33 && endHand33)
        tempPastSelections.push(
          getSavedSelection(["startHand33", "endHand33"])
        );
      if (startName3 && endName3)
        tempPastSelections.push(getSavedSelection(["startName3", "endName3"]));
      if (startContractDirection && endContractDirection)
        tempPastSelections.push(
          getSavedSelection(["startContractDirection", "endContractDirection"])
        );
      if (startBoardNum && endBoardNum)
        tempPastSelections.push(
          getSavedSelection(["startBoardNum", "endBoardNum"])
        );
      if (startAuction && endAuction)
        tempPastSelections.push(
          getSavedSelection(["startAuction", "endAuction"])
        );
      setPastSelections(tempPastSelections);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadFromHistory]);

  const handleMouseDown = (event) => {
    setIsMouseDown(true);
    const zoomRec = document.getElementById("zoom").getBoundingClientRect();
    const xPercent = (event.clientX - zoomRec.left) / zoomRec.width;
    const yPercent = (event.clientY - zoomRec.top) / zoomRec.height;
    setStartX(xPercent);
    setStartY(yPercent);
    setEndX(xPercent);
    setEndY(yPercent);
    const mouseLocation = [xPercent, yPercent];
    if (!startHand00) {
      setStartHand00(mouseLocation);
      window.localStorage.setItem("startHand00", mouseLocation);
    } else if (!startHand01) {
      setStartHand01(mouseLocation);
      window.localStorage.setItem("startHand01", mouseLocation);
    } else if (!startHand02) {
      setStartHand02(mouseLocation);
      window.localStorage.setItem("startHand02", mouseLocation);
    } else if (!startHand03) {
      setStartHand03(mouseLocation);
      window.localStorage.setItem("startHand03", mouseLocation);
    } else if (!startName0) {
      setStartName0(mouseLocation);
      window.localStorage.setItem("startName0", mouseLocation);
    } else if (!startHand10) {
      setStartHand10(mouseLocation);
      window.localStorage.setItem("startHand10", mouseLocation);
    } else if (!startHand11) {
      setStartHand11(mouseLocation);
      window.localStorage.setItem("startHand11", mouseLocation);
    } else if (!startHand12) {
      setStartHand12(mouseLocation);
      window.localStorage.setItem("startHand12", mouseLocation);
    } else if (!startHand13) {
      setStartHand13(mouseLocation);
      window.localStorage.setItem("startHand13", mouseLocation);
    } else if (!startName1) {
      setStartName1(mouseLocation);
      window.localStorage.setItem("startName1", mouseLocation);
    } else if (!startHand20) {
      setStartHand20(mouseLocation);
      window.localStorage.setItem("startHand20", mouseLocation);
    } else if (!startHand21) {
      setStartHand21(mouseLocation);
      window.localStorage.setItem("startHand21", mouseLocation);
    } else if (!startHand22) {
      setStartHand22(mouseLocation);
      window.localStorage.setItem("startHand22", mouseLocation);
    } else if (!startHand23) {
      setStartHand23(mouseLocation);
      window.localStorage.setItem("startHand23", mouseLocation);
    } else if (!startName2) {
      setStartName2(mouseLocation);
      window.localStorage.setItem("startName2", mouseLocation);
    } else if (!startHand30) {
      setStartHand30(mouseLocation);
      window.localStorage.setItem("startHand30", mouseLocation);
    } else if (!startHand31) {
      setStartHand31(mouseLocation);
      window.localStorage.setItem("startHand31", mouseLocation);
    } else if (!startHand32) {
      setStartHand32(mouseLocation);
      window.localStorage.setItem("startHand32", mouseLocation);
    } else if (!startHand33) {
      setStartHand33(mouseLocation);
      window.localStorage.setItem("startHand33", mouseLocation);
    } else if (!startName3) {
      setStartName3(mouseLocation);
      window.localStorage.setItem("startName3", mouseLocation);
    } else if (!startContractDirection) {
      setStartContractDirection(mouseLocation);
      window.localStorage.setItem("startContractDirection", mouseLocation);
    } else if (!startBoardNum) {
      setStartBoardNum(mouseLocation);
      window.localStorage.setItem("startBoardNum", mouseLocation);
    } else if (!startAuction) {
      setStartAuction(mouseLocation);
      window.localStorage.setItem("startAuction", mouseLocation);
    }
  };

  const handleMouseMove = (event) => {
    if (isMouseDown) {
      const zoomRec = document.getElementById("zoom").getBoundingClientRect();
      const xPercent = (event.clientX - zoomRec.left) / zoomRec.width;
      const yPercent = (event.clientY - zoomRec.top) / zoomRec.height;
      setEndX(xPercent);
      setEndY(yPercent);
    }
  };

  const handleMouseUp = (event) => {
    setIsMouseDown(false);
    const zoomRec = document.getElementById("zoom").getBoundingClientRect();
    const xPercent = (event.clientX - zoomRec.left) / zoomRec.width;
    const yPercent = (event.clientY - zoomRec.top) / zoomRec.height;
    setPastSelections([
      ...pastSelections,
      [
        [startX, startY],
        [xPercent, yPercent],
      ],
    ]);
    setStartX(null);
    setStartY(null);
    setEndX(null);
    setEndY(null);
    const mouseLocation = [xPercent, yPercent];
    if (!endHand00) {
      setEndHand00(mouseLocation);
      window.localStorage.setItem("endHand00", mouseLocation);
    } else if (!endHand01) {
      setEndHand01(mouseLocation);
      window.localStorage.setItem("endHand01", mouseLocation);
    } else if (!endHand02) {
      setEndHand02(mouseLocation);
      window.localStorage.setItem("endHand02", mouseLocation);
    } else if (!endHand03) {
      setEndHand03(mouseLocation);
      window.localStorage.setItem("endHand03", mouseLocation);
    } else if (!endName0) {
      setEndName0(mouseLocation);
      window.localStorage.setItem("endName0", mouseLocation);
    } else if (!endHand10) {
      setEndHand10(mouseLocation);
      window.localStorage.setItem("endHand10", mouseLocation);
    } else if (!endHand11) {
      setEndHand11(mouseLocation);
      window.localStorage.setItem("endHand11", mouseLocation);
    } else if (!endHand12) {
      setEndHand12(mouseLocation);
      window.localStorage.setItem("endHand12", mouseLocation);
    } else if (!endHand13) {
      setEndHand13(mouseLocation);
      window.localStorage.setItem("endHand13", mouseLocation);
    } else if (!endName1) {
      setEndName1(mouseLocation);
      window.localStorage.setItem("endName1", mouseLocation);
    } else if (!endHand20) {
      setEndHand20(mouseLocation);
      window.localStorage.setItem("endHand20", mouseLocation);
    } else if (!endHand21) {
      setEndHand21(mouseLocation);
      window.localStorage.setItem("endHand21", mouseLocation);
    } else if (!endHand22) {
      setEndHand22(mouseLocation);
      window.localStorage.setItem("endHand22", mouseLocation);
    } else if (!endHand23) {
      setEndHand23(mouseLocation);
      window.localStorage.setItem("endHand23", mouseLocation);
    } else if (!endName2) {
      setEndName2(mouseLocation);
      window.localStorage.setItem("endName2", mouseLocation);
    } else if (!endHand30) {
      setEndHand30(mouseLocation);
      window.localStorage.setItem("endHand30", mouseLocation);
    } else if (!endHand31) {
      setEndHand31(mouseLocation);
      window.localStorage.setItem("endHand31", mouseLocation);
    } else if (!endHand32) {
      setEndHand32(mouseLocation);
      window.localStorage.setItem("endHand32", mouseLocation);
    } else if (!endHand33) {
      setEndHand33(mouseLocation);
      window.localStorage.setItem("endHand33", mouseLocation);
    } else if (!endName3) {
      setEndName3(mouseLocation);
      window.localStorage.setItem("endName3", mouseLocation);
    } else if (!endContractDirection) {
      setEndContractDirection(mouseLocation);
      window.localStorage.setItem("endContractDirection", mouseLocation);
    } else if (!endBoardNum) {
      setEndBoardNum(mouseLocation);
      window.localStorage.setItem("endBoardNum", mouseLocation);
    } else if (!endAuction) {
      setEndAuction(mouseLocation);
      window.localStorage.setItem("endAuction", mouseLocation);
      window.localStorage.setItem("KibSync settings", true);
      setCalibrationOpen(false);
    }
  };

  const handsBorders = [
    [
      [startHand00, endHand00],
      [startHand01, endHand01],
      [startHand02, endHand02],
      [startHand03, endHand03],
    ],
    [
      [startHand10, endHand10],
      [startHand11, endHand11],
      [startHand12, endHand12],
      [startHand13, endHand13],
    ],
    [
      [startHand20, endHand20],
      [startHand21, endHand21],
      [startHand22, endHand22],
      [startHand23, endHand23],
    ],
    [
      [startHand30, endHand30],
      [startHand31, endHand31],
      [startHand32, endHand32],
      [startHand33, endHand33],
    ],
  ];

  const setHandsFromCalibration = async () => {
    const tempHands = [];
    const tempDeck = [];
    for (let hand = 0; hand < handsBorders.length; hand++) {
      const handBorders = handsBorders[hand];
      const handsLastImgs = [
        [
          [hand00LastImgRef.current, setHand00LastImg],
          [hand01LastImgRef.current, setHand01LastImg],
          [hand02LastImgRef.current, setHand02LastImg],
          [hand03LastImgRef.current, setHand03LastImg],
        ],
        [
          [hand10LastImgRef.current, setHand10LastImg],
          [hand11LastImgRef.current, setHand11LastImg],
          [hand12LastImgRef.current, setHand12LastImg],
          [hand13LastImgRef.current, setHand13LastImg],
        ],
        [
          [hand20LastImgRef.current, setHand20LastImg],
          [hand21LastImgRef.current, setHand21LastImg],
          [hand22LastImgRef.current, setHand22LastImg],
          [hand23LastImgRef.current, setHand23LastImg],
        ],
        [
          [hand30LastImgRef.current, setHand30LastImg],
          [hand31LastImgRef.current, setHand31LastImg],
          [hand32LastImgRef.current, setHand32LastImg],
          [hand33LastImgRef.current, setHand33LastImg],
        ],
      ];
      const handLastImgs = handsLastImgs[hand];
      const tempHand = [];
      await Promise.all([
        calibrateArea(
          handBorders[0][0],
          handBorders[0][1],
          handLastImgs[0][0],
          handLastImgs[0][1]
        ),
        calibrateArea(
          handBorders[1][0],
          handBorders[1][1],
          handLastImgs[1][0],
          handLastImgs[1][1]
        ),
        calibrateArea(
          handBorders[2][0],
          handBorders[2][1],
          handLastImgs[2][0],
          handLastImgs[2][1]
        ),
        calibrateArea(
          handBorders[3][0],
          handBorders[3][1],
          handLastImgs[3][0],
          handLastImgs[3][1]
        ),
      ]).then((values) => {
        values.forEach((suitText, suitIdx) => {
          const suitCards =
            suitText.vision
              ?.replaceAll(" ", "")
              .replaceAll(".", "")
              .replaceAll("10", "T")
              .split("") ?? [];
          for (let card of suitCards) {
            const rank = visionToRank(card);
            if (!isNaN(rank)) {
              tempHand.push({ suit: suitIdx, rank, hand });
              tempDeck.push({ suit: suitIdx, rank });
            }
          }
        });
      });
      tempHands.push(tempHand);
    }
    setHands(tempHands);
    setDeck(tempDeck);
  };

  const setNamesFromCalibration = async () => {
    const namesBorders = [
      [startName0, endName0],
      [startName1, endName1],
      [startName2, endName2],
      [startName3, endName3],
    ];
    let i = 0;
    for (let nameBorders of namesBorders) {
      const nameText = (await calibrateArea(nameBorders[0], nameBorders[1]))
        .vision;
      if (nameText) {
        if (i === 0) setNorthName(nameText);
        else if (i === 1) setEastName(nameText);
        else if (i === 2) setSouthName(nameText);
        else if (i === 3) setWestName(nameText);
      }
      i++;
    }
  };

  const setContractDirectionFromCalibration = async () => {
    const contractDirectionText = (
      await calibrateArea(startContractDirection, endContractDirection)
    ).vision;
    if (contractDirectionText) {
      const splitByLine = contractDirectionText.split("\n");
      const contract = splitByLine[0];
      const splitContract = contract.replace("NT", "N").split("");
      const tempContractLevel = splitContract[0];
      const tempContractSuit = bboVisionToSuit(splitContract[1]);
      const tempDeclarer = strToDirection(splitByLine[1]);
      setContractLevel(tempContractLevel);
      setContractSuit(tempContractSuit);
      setContractDbl(
        (splitContract[2] !== undefined) + (splitContract[3] !== undefined)
      );
      setTrump(tempContractSuit !== -1 ? tempContractSuit : null);
      setDeclarer(tempDeclarer);
      setLeader((tempDeclarer + 1) % 4);
      setWhoseTurn((tempDeclarer + 1) % 4);
    }
  };

  const setBoardNumFromCalibration = async () => {
    const boardNumText = (
      await calibrateArea(
        startBoardNum,
        endBoardNum,
        boardNumLastImgRef.current,
        setBoardNumLastImg
      )
    ).vision;
    if (boardNumText) {
      setBoardNum(boardNumText);
      setWhoseTurn((parseInt(boardNumText) - 1) % 4);
    }
  };

  const setBidFromCalibration = async () => {
    // based on the bids being displayed in WNES order in each row
    const effectiveAuctionLength =
      auctionRef.current.length + (boardNumRef.current % 4);
    const numRows = Math.floor(effectiveAuctionLength / 4);
    // assuming that 4 rows of bidding are displayed at a time
    const currentRow = Math.min(numRows, 4);
    const bidCellWidth =
      (endAuctionRef.current[0] - startAuctionRef.current[0]) / 4;
    const bidCellHeight =
      (endAuctionRef.current[1] - startAuctionRef.current[1]) / 4;
    const startBidCellLeft = ((whoseTurnRef.current + 1) % 4) * bidCellWidth;
    const startBidCellTop = currentRow * bidCellHeight;
    const endBidCellLeft = ((whoseTurnRef.current + 2) % 4 || 4) * bidCellWidth;
    const endBidCellTop = (currentRow + 1) * bidCellHeight;
    let nextBidVisionAndPalette = await calibrateArea(
      [
        startAuctionRef.current[0] + startBidCellLeft,
        startAuctionRef.current[1] + startBidCellTop,
      ],
      [
        startAuctionRef.current[0] + endBidCellLeft,
        startAuctionRef.current[1] + endBidCellTop,
      ],
      bidLastImgRef.current,
      setBidLastImg
    );
    const nextBid = nextBidVisionAndPalette.vision;
    const nextBidPalette = nextBidVisionAndPalette.palette;
    let bidObj = { hand: whoseTurnRef.current };
    if (nextBid) {
      if (["Pass", "Dbl", "Rdbl"].includes(nextBid)) {
        bidObj.action = nextBid;
        bid(bidObj);
      } else if (!isNaN(parseInt(nextBid[0]))) {
        // const nextBidSuitPrediction = await calibrateArea(
        //   [
        //     startAuctionRef.current[0] + startBidCellLeft,
        //     startAuctionRef.current[1] + startBidCellTop,
        //   ],
        //   [
        //     startAuctionRef.current[0] + endBidCellLeft,
        //     startAuctionRef.current[1] + endBidCellTop,
        //   ],
        //   true
        // );
        bidObj.action = "BID";
        bidObj.level = parseInt(nextBid.substring(0, 1));
        bidObj.strain = bboVisionToSuit(nextBid.substring(1), nextBidPalette);
        // bidObj.level = parseInt(nextBid.substring(0, 1));
        // bidObj.strain = nextBidSuitPrediction;
        bid(bidObj);
      }
    }
  };

  useEffect(() => {
    const auctionLength = auction.length;
    if (auctionLength > 0) {
      if (
        auctionLength < 4 ||
        auction[auctionLength - 1].action !== "Pass" ||
        auction[auctionLength - 2].action !== "Pass" ||
        auction[auctionLength - 3].action !== "Pass"
      ) {
        setWhoseTurn((whoseTurnRef.current + 1) % 4);
      } else if (
        auctionLength === 4 &&
        auction.every((call) => call.action === "Pass")
      ) {
        // console.log("hand passed out");
      } else {
        setContractDirectionFromCalibration();
      }
    }
  }, [auction]);

  const setCardFromCalibration = async () => {
    const hand = whoseTurnRef.current;
    const handBorders = handsBorders[hand];
    const handsLastImgs = [
      [
        [hand00LastImgRef.current, setHand00LastImg],
        [hand01LastImgRef.current, setHand01LastImg],
        [hand02LastImgRef.current, setHand02LastImg],
        [hand03LastImgRef.current, setHand03LastImg],
      ],
      [
        [hand10LastImgRef.current, setHand10LastImg],
        [hand11LastImgRef.current, setHand11LastImg],
        [hand12LastImgRef.current, setHand12LastImg],
        [hand13LastImgRef.current, setHand13LastImg],
      ],
      [
        [hand20LastImgRef.current, setHand20LastImg],
        [hand21LastImgRef.current, setHand21LastImg],
        [hand22LastImgRef.current, setHand22LastImg],
        [hand23LastImgRef.current, setHand23LastImg],
      ],
      [
        [hand30LastImgRef.current, setHand30LastImg],
        [hand31LastImgRef.current, setHand31LastImg],
        [hand32LastImgRef.current, setHand32LastImg],
        [hand33LastImgRef.current, setHand33LastImg],
      ],
    ];
    const handLastImgs = handsLastImgs[hand];
    const pastHandSet = new Set(
      handsRef.current[hand].map((card) => `${card.suit},${card.rank}`)
    );
    await Promise.all([
      calibrateArea(
        handBorders[0][0],
        handBorders[0][1],
        handLastImgs[0][0],
        handLastImgs[0][1]
      ),
      calibrateArea(
        handBorders[1][0],
        handBorders[1][1],
        handLastImgs[1][0],
        handLastImgs[1][1]
      ),
      calibrateArea(
        handBorders[2][0],
        handBorders[2][1],
        handLastImgs[2][0],
        handLastImgs[2][1]
      ),
      calibrateArea(
        handBorders[3][0],
        handBorders[3][1],
        handLastImgs[3][0],
        handLastImgs[3][1]
      ),
    ]).then((values) => {
      let remainingCardsSet = new Set();
      values.forEach((suitText, suitIdx) => {
        if (suitText.vision !== undefined) {
          const suitCards =
            suitText.vision
              ?.replaceAll(" ", "")
              .replaceAll("10", "T")
              .split("") ?? [];
          for (let card of suitCards) {
            const rank = visionToRank(card);
            remainingCardsSet.add(`${suitIdx},${rank}`);
          }
        } else {
          const remainingSuitCards = handsRef.current[hand].filter(
            (card) => card.suit === suitIdx
          );
          for (const remainingSuitCard of remainingSuitCards) {
            remainingCardsSet.add(
              `${remainingSuitCard.suit},${remainingSuitCard.rank}`
            );
          }
        }
      });
      const difference = pastHandSet.difference(remainingCardsSet);
      if (difference.size > 0) {
        const missingCard = Array.from(difference)[0];
        const split = missingCard.split(",");
        const suit = parseInt(split[0]);
        const rank = parseInt(split[1]);
        play({ suit, rank, hand }, true);
      }
    });
  };

  const pastOverlay = (
    <Canvas
      clearCanvasOnChange={false}
      pastSelections={pastSelections}
      style={{ position: "absolute" }}
      width={document.getElementById("zoom")?.offsetWidth}
      height={document.getElementById("zoom")?.offsetHeight}
    />
  );

  const currentOverlay = (
    <Canvas
      clearCanvasOnChange={true}
      start={startX && startY ? [startX, startY] : null}
      end={endX && endY ? [endX, endY] : null}
      style={{ position: "absolute" }}
      width={document.getElementById("zoom")?.offsetWidth}
      height={document.getElementById("zoom")?.offsetHeight}
    />
  );

  const calibration = (
    <Zoom in={calibrationOpen}>
      <div
        id="zoom"
        style={{
          display: "flex",
          position: "absolute",
          width: "75%",
          zIndex: 2,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {calibrationImage ?? null}
        {pastOverlay}
        {currentOverlay}
      </div>
    </Zoom>
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="viewAndControls">
        <View editable={true} videoChatContainer={videoChatContainer} />
        {/* {renderHand(
        unassignedCards,
        undefined,
        undefined,
        "assignCard",
        () => mode !== "assign",
        (card) => assign(card),
        tradeCard
      )} */}
        <div className="controls">
          {captureButton}
          {siteGroup}
          {broadcastTypeGroup}
          {lockedBySwitch}
          {analysisSwitch}
          {showPlayedCardsSwitch}
          <div className="row">{modeGroup}</div>
          <div className="row">
            {assignToGroup}
            {suitGroup}
          </div>
        </div>
      </div>
      {calibrationOpen && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            cursor: "not-allowed",
          }}
        >
          <IconButton
            style={{ color: "white" }}
            onClick={() => setCalibrationOpen(false)}
          >
            <ClearIcon />
          </IconButton>
          <IconButton
            style={{ color: "white" }}
            onClick={() => {
              window.localStorage.setItem("KibSync settings", false);
              setPastSelections([]);
              setStartHand00(null);
              setEndHand00(null);
              setStartHand01(null);
              setEndHand01(null);
              setStartHand02(null);
              setEndHand02(null);
              setStartHand03(null);
              setEndHand03(null);
              setStartName0(null);
              setEndName0(null);
              setStartHand10(null);
              setEndHand10(null);
              setStartHand11(null);
              setEndHand11(null);
              setStartHand12(null);
              setEndHand12(null);
              setStartHand13(null);
              setEndHand13(null);
              setStartName1(null);
              setEndName1(null);
              setStartHand20(null);
              setEndHand20(null);
              setStartHand21(null);
              setEndHand21(null);
              setStartHand22(null);
              setEndHand22(null);
              setStartHand23(null);
              setEndHand23(null);
              setStartName2(null);
              setEndName2(null);
              setStartHand30(null);
              setEndHand30(null);
              setStartHand31(null);
              setEndHand31(null);
              setStartHand32(null);
              setEndHand32(null);
              setStartHand33(null);
              setEndHand33(null);
              setStartName3(null);
              setEndName3(null);
              setStartContractDirection(null);
              setEndContractDirection(null);
              setStartBoardNum(null);
              setEndBoardNum(null);
              setStartAuction(null);
              setEndAuction(null);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            style={{ color: "white" }}
            onClick={() => setLoadFromHistory(true)}
          >
            <HistoryIcon />
          </IconButton>
        </div>
      )}
      {calibrationOpen && calibration}
    </ThemeProvider>
  );
};

export default Control;
