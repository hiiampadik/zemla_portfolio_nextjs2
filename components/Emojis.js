import styles from "../styles/Emojis.module.scss";

import { useEffect, useState } from "react";

export default function Emojis(props) {
  const [positions, setPositions] = useState(null);

  useEffect(() => {
    getNewPosition();
  }, []);

  useEffect(() => {
    getNewPosition();
  }, [props.positions]);


  const getNewPosition = () => {
    let tmpPositions = [];
    for (let i = 0; i < 6; i++) {
      tmpPositions.push([
        12 + Math.floor(Math.random() * 80) + "vh",
        5 + Math.floor(Math.random() * 90) + "vw",
      ]);
    }
    setPositions(tmpPositions);
  };

  return (
    <div className={`${styles.emojisContainer} ${props.qualityEmojis ? styles.qualityEmojis : ''}`}>
      {positions ? (
        <>
          <div style={{ top: positions[0][0], left: positions[0][1] }}>
            {"( 0 _ 0 )"}
          </div>
          <div style={{ top: positions[1][0], left: positions[1][1] }}>
            {"{ ^_^ }"}
          </div>
          <div style={{ top: positions[2][0], left: positions[2][1] }}>
            {"( ‘ = ’ )"}
          </div>
          <div style={{ top: positions[3][0], left: positions[3][1] }}>
            {"( 0 _ 0 )"}
          </div>
          <div style={{ top: positions[4][0], left: positions[4][1] }}>
            {"{ ^_^ }"}
          </div>
          <div style={{ top: positions[5][0], left: positions[5][1] }}>
            {"( ‘ = ’ )"}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
