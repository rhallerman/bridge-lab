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
    // const rawResultsNew = [
    //   ["4", 1, "3", "-1", "100", "4", 1, "3", "-2", "-200", "", "1"],
    // ];
    const rawResultsOld = [
      [
        "4",
        "HEARTS",
        "W",
        "-1",
        "100",
        "4",
        "HEARTS",
        "W",
        "-2",
        "-200",
        "",
        "1",
      ],
      ["2", "HEARTS", "N", "=", "110", "3", "CLUBS", "E", "-1", "-50", "2", ""],
      [
        "3",
        "DIAMONDS",
        "N",
        "=",
        "110",
        "4",
        "CLUBS",
        "W",
        "-3",
        "-150",
        "",
        "1",
      ],
      [
        "3",
        "DIAMONDS",
        "N",
        "-1",
        "-50",
        "2",
        "SPADES",
        "E",
        "-1",
        "-100",
        "",
        "4",
      ],
      [
        "2",
        "SPADES",
        "W",
        "-1",
        "100",
        "2",
        "HEARTS",
        "W",
        "-2",
        "-200",
        "",
        "3",
      ],
      [
        "4",
        "SPADES",
        "W",
        "+1",
        "-450",
        "4",
        "SPADES",
        "W",
        "+1",
        "450",
        "",
        "",
      ],
      [
        "3",
        "SPADES",
        "N",
        "-3",
        "-150",
        "2",
        "DIAMONDSX",
        "S",
        "-2",
        "300",
        "4",
        "",
      ],
      [
        "4",
        "SPADES",
        "W",
        "+1",
        "-650",
        "4",
        "SPADES",
        "W",
        "+1",
        "650",
        "",
        "",
      ],
      [
        "4",
        "HEARTS",
        "S",
        "=",
        "420",
        "3",
        "HEARTS",
        "S",
        "+1",
        "-170",
        "6",
        "",
      ],
      ["3", "N", "N", "=", "400", "2", "N", "N", "+1", "-150", "6", ""],
      ["3", "N", "S", "-3", "-300", "3", "N", "S", "-4", "400", "3", ""],
      [
        "3",
        "HEARTS",
        "E",
        "+1",
        "-170",
        // "4",
        // "HEARTS",
        // "W",
        // "-1",
        // "-50",
        // "",
        // "6",
      ],
      [
        "4",
        "SPADESX",
        "S",
        "-1",
        "-200",
        // "4",
        // "HEARTS",
        // "E",
        // "=",
        // "420",
        // "6",
        // "",
      ],
      // ["3", "N", "W", "+1", "-630", "3", "N", "W", "-2", "-200", "", "13"],
      // ["4", "CLUBS", "N", "+1", "150", "4", "CLUBS", "N", "=", "-130", "1", ""],
    ];
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
    const rawResults = [
      ["Lebowitz (1)", 147, "Roche (32)", 123],
      ["Knottenbelt (2)", 99, "Rippey (31)", 90],
      ["Wademark (3)", 214, "Rodrigues (30)", 99],
      ["Levine (4)", 129, "Zhang (29)", 123],
      ["Zimmermann (5)", 149, "Kolesnik (28)", 105],
      ["Bailey (6)", 114, "Juster (27)", 137],
      ["Street (7)", 139, "Texan Aces (26)", 116],
      ["Goodman (8)", 112, "Hoskins (25)", 66],
      ["McAllister (9)", 103, "Han (24)", 147],
      ["Bernal (10)", 149, "Lall (23)", 92],
      ["Amoils (11)", 148, "Dyson (22)", 116],
      ["Goldberg (12)", 178, "Dinkin (21)", 136],
      ["Far Hoftaniska (13)", 114, "Hans (20)", 221],
      ["Nickell (14)", 86, "Fleisher (19)", 117],
      ["Bremark (15)", 152, "Van Oosten (18)", 96],
      ["Freeman (16)", 177, "Thompson (17)", 123],
    ];
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
