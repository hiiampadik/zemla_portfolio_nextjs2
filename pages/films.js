import styles from "../styles/Films.module.scss";
import Layout from "../components/Layout";
import Emojis from "../components/Emojis";
import BlockContent from "../components/BlockContent";

import client from "../client";
import { useEffect, useState } from "react";

import Draggable from "react-draggable";
import ReactPlayer from "react-player";

import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import cs from "../components/languages/cs";
import en from "../components/languages/en";

export default function Films(props) {
  const router = useRouter();
  const t = router.locale === "cs" ? cs : en;
  
  const [positions, setPositions] = useState(null);
  const { theme } = useTheme();

  const [showWindow, setShowWindow] = useState(null);

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (props.films != null) {
      getNewPosition();
    }
  }, [props.films]);



  const getNewPosition = () => {

    let yPositions = [];
    if (windowSize !== null) {
      for (let i = 0; i < ((windowSize.innerHeight - 200) / 50); i++) {
        yPositions = [...yPositions, i * 50 + 80];
      }
      yPositions = [...shuffle(yPositions)]

      let tmpPositions = [];
      for (let i = 0; i < props.films.length; i++) {
        tmpPositions.push([
          yPositions[i] + 'px',
          15 + Math.floor(Math.random() * (windowSize.innerWidth - 300)) + "px",
        ]);
      }
      setPositions(tmpPositions);
    }
  };


  const openWindow = (film) => {
    setShowWindow(film);
  };

  const getStyles = () => {
    if (theme === "highTech") {
      return styles.filmsReloadHigh;
    } else if (theme === "lowTech") {
      return styles.filmsReloadLow;
    }
  };

  return (
    <Layout title={t.films}>
      <Emojis positions={positions} />
      <div
        className={`${styles.filmsReload} ${getStyles()}`}
        onClick={getNewPosition}
      ></div>
      <div>
        {props.films?.map((film, i) => {
          if (positions == null) {
            return "";
          } else {
            return (
              <div
                className={styles.filmButtonContainer}
                style={{ top: positions[i][0], left: positions[i][1] }}
                key={film._id}
                onClick={() => openWindow(film)}
              >
                <h1>{router.locale === "cs" ? film.nameCs : film.nameEn}</h1>
              </div>
            );
          }
        })}
      </div>
      {showWindow != null ? (
        <div className={styles.boundParent}>
          <Draggable handle="span" bounds="parent">
            <div className={styles.filmContainer}>
              <span>
                <div className={styles.filmContainerHeader}>
                  {router.locale === "cs" ? showWindow.nameCs : showWindow.nameEn}
                </div>
              </span>
              <div
                onClick={() => setShowWindow(null)}
                className={styles.filmClose}
              ></div>
              <div>
                <div className={styles.filmPlayerWrapper}>
                  <ReactPlayer
                    url={showWindow.url}
                    width="100%"
                    height="100%"
                    controls={true}
                    muted={false}
                    className={styles.filmPlayer}
                  />
                </div>
                <div className={styles.filmContent}>
                  <BlockContent
                    blocks={
                      router.locale === "cs" ? showWindow.cs : showWindow.en
                    }
                    noLanguage
                  />
                </div>
              </div>
            </div>
          </Draggable>
        </div>
      ) : (
        ""
      )}
    </Layout>
  );
}

function getWindowSize() {
  if (typeof window !== "undefined") {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  } else {
    return null;
  }
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const films = await client.fetch(
    `
        *[_type == 'films']
      `,
    ""
  );
  return {
    props: {
      films,
    },
    revalidate: 10,
  };
}
