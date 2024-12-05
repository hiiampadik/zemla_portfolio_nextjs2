import styles from "../styles/TopMenu.module.scss";
import React, {useState} from "react";
import Link from "next/link";

import About from "./About";

import {useRouter} from "next/router";
import cs from "./languages/cs";
import en from "./languages/en";

import {useTheme} from "next-themes";

export default function TopMenu(props) {
  const [showAbout, setShowAbout] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const t = router.locale === "cs" ? cs : en;
  const languageButton = router.locale === "cs" ? "en" : "cz";

  const {theme, setTheme} = useTheme();

  const handleQuality = () => {
    if (theme === "lowTech") {
      props.handleQuality("highTech");
    } else if (theme === "highTech") {
      props.handleQuality("lowTech");
    }
  };

  const handleMenu = () => {
    setShowMenu((i) => !i);
  };

  return (
    <nav>
      {showMenu && (theme === "lowTech" || theme === "highTech") && (
        <MenuWindow
          handleQuality={() => handleQuality()}
          handleMenu={handleMenu}
        />
      )}

      <ContainerMenu
        handleMenu={handleMenu}
        handleQuality={handleQuality}
        t={t}
        router={router}
        showMenu={showMenu}
        theme={theme}
        languageButton={languageButton}
      />

      {(theme === "lowTech" || theme === "highTech") && (
        <>
          {router.pathname !== "/projects/[slug]" && (
            <>
              <div className={styles.navFooter}>
                <a href="mailto:petr@zem.la" className={styles.brown}>
                  petr@zem.la
                </a>
                <a
                  href="https://www.instagram.com/zem.la/"
                  className={styles.brown}
                >
                  Instagram
                </a>
              </div>
              {/* <Link href={"/articles"} locale={router.locale}>
            <a className={styles.navArticles}>{t.articles}</a>
          </Link> */}
            </>
          )}
          <div
            className={styles.navAbout}
            onClick={() => setShowAbout(!showAbout)}
          >
            <p>{t.about}</p>
          </div>

          {showAbout ? <About handleClose={() => setShowAbout(false)} /> : ""}
        </>
      )}
    </nav>
  );
}

function ContainerMenu(props) {
  const getClassBorder = () => {
    if (
      props.router.pathname === "/articles" ||
      props.router.pathname === "/articles/[slug]" ||
      props.router.pathname === "/projects/[slug]"
    ) {
      return styles.navBgBorder;
    } else {
      return "";
    }
  };

  return (
    <div className={styles.nav}>
      <div className={`${props.theme === "lowTech" || props.theme === "highTech" ? styles.navLeftContainer : styles.navLeftContainerQuality} `}>
        <Link href={"/"} locale={props.router.locale}>
          <a className={styles.blue}>Petr Žemla</a>
        </Link>
      </div>

      {(props.theme === "lowTech" || props.theme === "highTech") && (
        <div className={styles.navCenterContainer}>
          <Link href={"/projects"} locale={props.router.locale}>
            <a className={styles.yellow}>{props.t.projects}</a>
          </Link>
          <Link href={"/commercial"} locale={props.router.locale}>
            <a className={styles.orange}>{props.t.commercial}</a>
          </Link>
          <Link href={"/films"} locale={props.router.locale}>
            <a className={styles.pink}>{props.t.films}</a>
          </Link>
          {/* <Link href={"/print"} locale={props.router.locale}>
          {props.t.print}
        </Link> */}
          {/* <Link href={"/articles"} locale={props.router.locale}>
          {props.t.articles}
        </Link> */}
        </div>
      )}

      {(props.theme === "lowTech" || props.theme === "highTech") && (
        <button
          className={styles.navCenterMenu}
          onClick={() => props.handleMenu()}
        ></button>
      )}
      <div className={styles.navRightContainer}>
        {(props.theme === "lowTech" || props.theme === "highTech") && (
          <div
            className={styles.navQuality}
            onClick={() => props.handleQuality()}
          >
            <div className={styles.navQualityBg}></div>
            <p className={styles.navQualityText}>
              {props.theme === "lowTech" ? "HIGH" : "LOW"}
            </p>
          </div>
        )}
        <Link
          href={props.router.asPath}
          locale={props.languageButton == "en" ? "en" : "cs"}
        >
          <a className={styles.green}>{props.languageButton}</a>
        </Link>
      </div>

      <div className={`${styles.navBg} ${getClassBorder()}`}></div>
    </div>
  );
}

function MenuWindow(props) {
  const router = useRouter();

  const t = router.locale === "cs" ? cs : en;

  return (
    <div className={styles.menuWindowContainer}>
      <div className={styles.menuWindowTop}>
        <Link href={"/projects"} locale={router.locale}>
          <a className={styles.yellow}>{t.projects}</a>
        </Link>
        <Link href={"/commercial"} locale={router.locale}>
          <a className={styles.orange}>{t.commercial}</a>
        </Link>
        <Link href={"/films"} locale={router.locale}>
          <a className={styles.pink}>{t.films}</a>
        </Link>
        {/* <Link href={"/print"} locale={router.locale}>
          {t.print}
        </Link> */}
        {/* <Link href={"/articles"} locale={router.locale}>
          {t.articles}
        </Link> */}
      </div>

      <div
        onClick={() => props.handleMenu()}
        className={styles.menuWindowClose}
      ></div>
    </div>
  );
}
