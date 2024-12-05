import Header from "../components/Head";
import TopMenu from "../components/TopMenu";
import QualitySettings from "./QualitySettings";

import React, { useState, useEffect } from "react";

import styles from "../styles/Layout.module.scss";

import { useTheme } from "next-themes";

export default function Layout({ 
  title = 'Petr Žemla',
  children 
}) {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleQualityNow = (newTheme) => {
    if (newTheme == "lowTech") {
      setTheme("lowTech");
    } else if (newTheme == "highTech") {
      setTheme("highTech");
    }
  }


  const [animationClass, setAnimationClass] = useState('');

  const getAnimationClass = () => {
    if (animationClass === 'hideContent'){
      return styles.hideContent;
    } else if (animationClass === 'showContent'){
      return styles.showContent;
    }
  }

  const handleQuality = (newTheme) => {  
    setAnimationClass('hideContent');
    setTimeout(() => {
      if (newTheme == "lowTech") {
        setTheme("lowTech");
      } else if (newTheme == "highTech") {
        setTheme("highTech");
      }
      setAnimationClass('showContent');
    }, 700);
  };


  const getContent = () => {
    if (mounted) {
      if (theme === "lowTech" || theme === "highTech") {
        return (
          <>
            <TopMenu handleQuality={handleQuality} showQualitySettings={false}/>
            <main className={styles.main}>{children}</main>
          </>
        );
      } else {
        return (
          <>
            <TopMenu handleQuality={handleQualityNow} showQualitySettings={false}/>
            <QualitySettings handleQuality={handleQualityNow} />
            <main className={styles.main}>{children}</main>
          </>
      )
      }
    }
  };

  return (
    <div>
      <Header title={title}/>
      <div className={`${styles.overlay} ${getAnimationClass()}`}></div>
      {getContent()}
    </div>
  );
}
