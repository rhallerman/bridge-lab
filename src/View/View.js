import React, { useContext, useState, useEffect } from "react";
import { Divider, Grid, TextField } from "@mui/material";
import { Context } from "../Context/Context";
import "./View.css";
// import Webcam from "react-webcam";
import usbfLogo from "../Images/usbf.png";
import lovebridgeLogo from "../Images/lovebridge.png";
import kibsyncLogo from "../Images/kibsync.png";
import LiveTable from "./LiveTable";
import AnalysisTable from "./AnalysisTable";
import Auction from "./Auction";

const View = ({ editable, videoChatContainer }) => {
  let {
    metaEventName,
    setMetaEventName,
    eventName,
    setEventName,
    roundInfo,
    setRoundInfo,
    roomInfo,
    setRoomInfo,
    segmentNum,
    setSegmentNum,
    numSegments,
    setNumSegments,
    boardNum,
    setBoardNum,
    numBoards,
    setNumBoards,
    reality,
    suitChars,
    strToSuit,
  } = useContext(Context);

  const headerInputField = (label, value, onChange, textAlign) => (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      className="headerInput"
      size="small"
      fullWidth
      inputProps={{
        style: { color: "white", textAlign: textAlign, padding: 0 },
      }}
      InputLabelProps={{
        style: { color: "#fff", textAlign: textAlign },
        shrink: true,
      }}
    />
  );

  const header = (
    <div className="header">
      <Grid container alignItems="center">
        <Grid item xs={2.5}>
          <div className="headerInfoItem">
            <div className="headerTextKey">SEGMENT: </div>
            {editable ? (
              headerInputField(
                "",
                segmentNum,
                (event) => setSegmentNum(event.target.value.toUpperCase()),
                "center"
              )
            ) : (
              <div className="headerTextVal">{segmentNum}</div>
            )}
            <div className="headerTextVal">
              {editable || numSegments ? "OF" : ""}
            </div>
            {editable ? (
              headerInputField(
                "",
                numSegments,
                (event) => setNumSegments(event.target.value.toUpperCase()),
                "center"
              )
            ) : (
              <div className="headerTextVal">{numSegments}</div>
            )}
          </div>
          <div className="headerInfoItem">
            <div className="headerTextKey">BOARD: </div>
            {editable ? (
              headerInputField(
                "",
                boardNum,
                (event) => setBoardNum(event.target.value.toUpperCase()),
                "center"
              )
            ) : (
              <div className="headerTextVal">{boardNum}</div>
            )}
            <div className="headerTextVal">
              {editable || numBoards ? "OF" : ""}
            </div>
            {editable ? (
              headerInputField(
                "",
                numBoards,
                (event) => setNumBoards(event.target.value.toUpperCase()),
                "center"
              )
            ) : (
              <div className="headerTextVal">{numBoards}</div>
            )}
          </div>
        </Grid>
        <Grid item xs={7}>
          <div className="logoAndTitle">
            {!editable && <img src={usbfLogo} className="logo" alt="USBF" />}
            {!editable && (
              <img src={lovebridgeLogo} className="logo" alt="lovebridge" />
            )}
            <div className={editable ? "title titleInput" : "title"}>
              {editable ? (
                headerInputField(
                  "Meta Event Name",
                  metaEventName,
                  (event) => setMetaEventName(event.target.value.toUpperCase()),
                  "center"
                )
              ) : (
                <div className="headerTextVal">{metaEventName}</div>
              )}
              {editable ? (
                headerInputField(
                  "Event Name",
                  eventName,
                  (event) => setEventName(event.target.value.toUpperCase()),
                  "center"
                )
              ) : (
                <div className="headerTextVal">{eventName}</div>
              )}
            </div>
            {!editable && (
              <img src={kibsyncLogo} className="logo" alt="kibsync" />
            )}
          </div>
        </Grid>
        <Grid item xs={2.5}>
          <div className="subtitle">
            {editable ? (
              headerInputField(
                "Round Info",
                roundInfo,
                (event) => setRoundInfo(event.target.value.toUpperCase()),
                "right"
              )
            ) : (
              <div className="headerTextKey">{roundInfo}</div>
            )}
            {editable ? (
              headerInputField(
                "Room Info",
                roomInfo,
                (event) => setRoomInfo(event.target.value.toUpperCase()),
                "right"
              )
            ) : (
              <div className="headerTextVal">{roomInfo}</div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );

  // const teamInfo = (
  //   <div className="teams">
  //     <div className="team">
  //       <div className="teamName">ZIMMERMAN</div>
  //       <div>
  //         <div className="playerName">Pierre Zimmermann</div>
  //         <div className="playerName">Michal Nowosadzki</div>
  //         <div className="playerName">Sebastiaan Drijver</div>
  //         <div className="playerName">Sjoert Brink</div>
  //         <div className="playerName">Jacek Kalita</div>
  //         <div className="playerName">Michal Klukowski</div>
  //       </div>
  //     </div>
  //     <div className="scores">
  //       <div className="score">108</div>
  //       <div className="dividerWrapper">
  //         <div className="teamDivider" />
  //       </div>
  //       <div className="score">83</div>
  //     </div>
  //     <div className="team">
  //       <div className="teamName">STREET</div>
  //       <div>
  //         <div className="playerName">Paul Street</div>
  //         <div className="playerName">Nicolas L'Ecuyer</div>
  //         <div className="playerName">Ron Pachtmann</div>
  //         <div className="playerName">Piotr Pawel Zatorski</div>
  //         <div className="playerName">Andrea Manno</div>
  //         <div className="playerName">Massimiliano Di Franco</div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // const webcam = (commentator, idx) => (
  //   <div className="commentator">
  //     {commentator.video ? (
  //       <Webcam className="webcam" />
  //     ) : (
  //       <div className="webcamOff" />
  //     )}
  //   </div>
  // );

  const leftArea = <div className="leftArea">{videoChatContainer}</div>;

  const [thisMatchResults, setThisMatchResults] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setThisMatchResults(!thisMatchResults);
    }, 10000);
    return () => clearInterval(interval);
  }, [thisMatchResults]);

  // const resultsArrToStr = (arr) => {
  //   let table1Result = arr[0];
  //   table1Result += suitChars[arr[1]];
  //   table1Result += directionToStr(arr[2]);
  //   table1Result += arr[3];
  //   const table1Raw = arr[4];

  //   let table2Result = arr[5];
  //   table2Result += suitChars[arr[6]];
  //   table2Result += directionToStr(arr[7]);
  //   table2Result += arr[8];
  //   const table2Raw = arr[9];

  //   const table1IMPs = arr[10];
  //   const table2IMPs = arr[11];
  // };

  const results = () => {
    const rawResultsOld = [];
    const allResults = rawResultsOld.map((result, resultIdx) => {
      const thisSuit = strToSuit(result[1] ?? "");
      const otherSuit = strToSuit(result[6] ?? "");
      return [
        <div key={`board${resultIdx}`} className="centerCell rightBorder">
          {resultIdx + 1}
        </div>,
        <div key={`thisContract${resultIdx}`} className="pastContract">
          {result[0]}
          <div className={`suit${thisSuit}`}>{suitChars[thisSuit]}</div>
          {result[2]}
          {result[3]}
        </div>,
        <div key={`thisResult${resultIdx}`} className="rightCell rightBorder">
          {result[4]}
        </div>,
        <div key={`otherContract${resultIdx}`} className="pastContract">
          {result[5]}
          <div className={`suit${otherSuit}`}>{suitChars[otherSuit]}</div>
          {result[7]}
          {result[8]}
        </div>,
        <div key={`otherResult${resultIdx}`} className="rightCell rightBorder">
          {result[9]}
        </div>,
        ...(result[10] !== "" || result[11] !== ""
          ? [
              <div key={`nsScore${resultIdx}`} className="centerCell">
                {result[10]}
              </div>,
              <div key={`ewScore${resultIdx}`} className="centerCell">
                {result[11]}
              </div>,
            ]
          : [
              <div key={`nsScore${resultIdx}`} className="pushCell">
                <Divider variant="middle" className="pushScore" />
              </div>,
              <div key={`ewScore${resultIdx}`} className="pushCell">
                <Divider variant="middle" className="pushScore" />
              </div>,
            ]),
      ];
    });
    return (
      <div className="results">
        <div className="resultsTitle">SCORECARD</div>
        <div className="resultsGrid">
          <div></div>
          <div className="twoColumnTitle centerCell">This Room</div>
          <div className="twoColumnTitle centerCell">Other Room</div>
          <div className="twoColumnTitle centerCell">Score</div>
          {allResults}
        </div>
      </div>
    );
  };

  const otherResults = () => {
    const matchResult = ([teamName1, score1, teamName2, score2]) => {
      return (
        <div key={`${teamName1}:${teamName2}`} className="matchResult">
          <div className="matchResultColumn">
            <div key={`${teamName1}Name`} className="matchResultItem home">
              {teamName1}
            </div>
            <div key={`${teamName2}Name`} className="matchResultItem away">
              {teamName2}
            </div>
          </div>
          <div className="matchResultColumn">
            <div key={`${teamName1}Score`} className="matchResultItem home">
              {score1}
            </div>
            <div key={`${teamName2}Score`} className="matchResultItem away">
              {score2}
            </div>
          </div>
        </div>
      );
    };
    const matchResultRow = (matchResult1, matchResult2) => {
      return (
        <div
          key={`${matchResult1.key}/${matchResult2.key}`}
          className="matchResultRow"
        >
          {matchResult1}
          {matchResult2}
        </div>
      );
    };
    const rawResults = [];
    const matchResults = rawResults.map((result) => matchResult(result));
    let matchResultRows = [];
    while (matchResults.length > 1) {
      const [matchResult1, matchResult2] = matchResults.splice(0, 2);
      matchResultRows.push(matchResultRow(matchResult1, matchResult2));
    }
    return (
      <div className="results">
        <div className="resultsTitle">MATCH RESULTS</div>
        {matchResultRows}
      </div>
    );
  };

  const rightArea = (
    <div className="rightArea">
      <Auction />
      <div
        className={`bottomRight animate ${reality ? "visible" : "invisible"}`}
      >
        <div
          className={`resultsOption animate ${
            thisMatchResults ? "visible" : "invisible"
          }`}
        >
          {results()}
        </div>
        <div
          className={`resultsOption animate ${
            thisMatchResults ? "invisible" : "visible"
          }`}
        >
          {otherResults()}
        </div>
      </div>
    </div>
  );

  return (
    <div className="background">
      {header}
      <div className="belowHeader">
        <div className="areas">
          {leftArea}
          <AnalysisTable editable={editable} />
          <LiveTable editable={editable} />
          {rightArea}
        </div>
      </div>
    </div>
  );
};

export default View;
