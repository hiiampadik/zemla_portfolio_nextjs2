import styles from "../styles/Films.module.scss";
import Layout from "../components/Layout";
import Emojis from "../components/Emojis";

import Link from "next/link";

import client from "../client";
import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import cs from "../components/languages/cs";
import en from "../components/languages/en";

export default function Projects(props) {
  const router = useRouter();
  const t = router.locale === "cs" ? cs : en;

  const [positions, setPositions] = useState(null);
  const { theme, setTheme } = useTheme();
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
    if (props.projects != null) {
      getNewPosition();
    }
  }, [props.projects]);

  const getNewPosition = () => {

    let yPositions = [];
    if (windowSize !== null) {
      for (let i = 0; i < ((windowSize.innerHeight - 200) / 50); i++) {
        yPositions = [...yPositions, i * 50 + 80];
      }
      yPositions = [...shuffle(yPositions)]

      let tmpPositions = [];
      for (let i = 0; i < props.projects.length; i++) {
        tmpPositions.push([
          yPositions[i] + 'px',
          15 + Math.floor(Math.random() * (windowSize.innerWidth - 300)) + "px",
        ]);
      }
      setPositions(tmpPositions);
    }
  };


  const getStyles = () => {
    if (theme === "highTech") {
      return styles.filmsReloadHigh;
    } else if (theme === "lowTech") {
      return styles.filmsReloadLow;
    }
  };

  return (
    <Layout title={t.projects}>
      <Emojis positions={positions} />
      <div
        className={`${styles.filmsReload} ${getStyles()}`}
        onClick={getNewPosition}
      ></div>
      <div>
        {props.projects?.map((project, i) => {
          if (positions == null) {
            return "";
          } else {
            const slug = project._id ? project.slug?.current : "";
            return (
              <Link
                key={project._id}
                href="/projects/[slug]"
                as={`/projects/${slug}`}
              >
                <a
                  className={styles.filmButtonContainer}
                  style={{ top: positions[i][0], left: positions[i][1] }}
                >
                  <h1>{router.locale === "cs" ? project.nameCs : project.nameEn}</h1>
                </a>
              </Link>
            );
          }
        })}
      </div>
    </Layout>
  );
}

function getWindowSize () {
  if (typeof window !== "undefined") {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  } else {
    return null;
  }
};

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const projects = await client.fetch(
    `
          *[_type == 'projects']
        `,
    ""
  );
  return {
    props: {
      projects,
    },
    revalidate: 10,
  };
}
