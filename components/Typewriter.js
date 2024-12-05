import styles from "../styles/QualitySettings.module.scss";

import Typewriter from "typewriter-effect";
import {useRouter} from "next/router";
import { useEffect, useState } from "react";


export default function TypeWriter() {
  const router = useRouter();

  const [strings, setStrings] = useState( [
    "Photogarphy portfolio",
    "graphy potrfolio",
    " protfolio",
    " portfoiol",
    "rtfolium",
    "otrfoloi",
    " prftoliot",
    "ootgrpahy ptrooflio",
    "otogarphy prlftoooi",
    "fgtrgcooay frtpliooo",
  ] )


     const cs = [
        "Fotogarfické portfolio",
        "rafické potrfolio",
        " protfolio",
        " portfoiol",
        "rtfolium",
        "otrfoloi",
        " prftoliot",
        "togarfckié ptrooflio",
        "otgaréfcki prlftoooi",
        "fgtrkcooaié frtpliooo",
      ]

      const en = [
        "Photogarphy portfolio",
        "graphy potrfolio",
        " protfolio",
        " portfoiol",
        "rtfolium",
        "otrfoloi",
        " prftoliot",
        "ootgrpahy ptrooflio",
        "otogarphy prlftoooi",
        "fgtrgcooay frtpliooo",
      ]

  return (
    <>
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .pauseFor(600)
              .typeString(cs[0])
              .pauseFor(1000)
              .deleteChars(17)
              .pauseFor(300)
              .typeString(cs[1])
              .pauseFor(1300)
              .deleteChars(9)
              .pauseFor(400)
              .typeString(cs[2])
              .pauseFor(1500)
              .deleteChars(9)
              .pauseFor(600)
              .typeString(cs[3])
              .pauseFor(900)
              .deleteChars(7)
              .pauseFor(400)
              .typeString(cs[4])
              .pauseFor(700)
              .deleteChars(9)
              .pauseFor(300)
              .typeString(cs[5])
              .pauseFor(900)
              .deleteChars(9)
              .pauseFor(300)
              .typeString(cs[6])
              .pauseFor(900)
              .deleteChars(23)
              .pauseFor(300)
              .typeString(cs[7])
              .pauseFor(500)
              .deleteChars(20)
              .pauseFor(300)
              .typeString(cs[8])
              .pauseFor(500)
              .deleteChars(21)
              .pauseFor(1100)
              .typeString(cs[9])
              .pauseFor(400)

              .deleteAll()

              .start();
          }}
          options={{
            autoStart: true,
            cursor: "",
            loop: true,
            delay: 40,
            deleteSpeed: 50,
            wrapperClassName: `${styles.landingTypewriter} ${router.locale === 'cs' ? styles.typewriterShow : ''}`,
          }}
        />
        
        <Typewriter
        onInit={(typewriter) => {
          typewriter
            .pauseFor(600)
            .typeString(en[0])
            .pauseFor(1000)
            .deleteChars(16)
            .pauseFor(300)
            .typeString(en[1])
            .pauseFor(1300)
            .deleteChars(9)
            .pauseFor(400)
            .typeString(en[2])
            .pauseFor(1500)
            .deleteChars(9)
            .pauseFor(600)
            .typeString(en[3])
            .pauseFor(900)
            .deleteChars(7)
            .pauseFor(400)
            .typeString(en[4])
            .pauseFor(700)
            .deleteChars(9)
            .pauseFor(300)
            .typeString(en[5])
            .pauseFor(900)
            .deleteChars(9)
            .pauseFor(300)
            .typeString(en[6])
            .pauseFor(900)
            .deleteChars(22)
            .pauseFor(300)
            .typeString(en[7])
            .pauseFor(500)
            .deleteChars(19)
            .pauseFor(300)
            .typeString(en[8])
            .pauseFor(500)
            .deleteChars(20)
            .pauseFor(1100)
            .typeString(en[9])
            .pauseFor(400)

            .deleteAll()

            .start();
        }}
        options={{
          autoStart: true,
          cursor: "",
          loop: true,
          delay: 40,
          deleteSpeed: 50,
          wrapperClassName: `${styles.landingTypewriter} ${router.locale === 'en' ? styles.typewriterShow : ''}`,
        }}
      />
      
      
      </>
  );
}
