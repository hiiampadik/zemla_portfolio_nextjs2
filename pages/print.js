import styles from "../styles/Print.module.scss";
import Layout from "../components/Layout";
import Figure from "../components/Figure";
import BlockContent from "../components/BlockContent";

import client from "../client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

import cs from "../components/languages/cs";
import en from "../components/languages/en";

export default function Print(print) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const t = router.locale === "cs" ? cs : en;

  const getImage = (image) => {
    if (theme == "highTech" && image?.imageNormal != null) {
      return image.imageNormal;
    } else if (theme == "lowTech" && image?.imageLow != null) {
      return image.imageLow;
    }
  };

  const getImageDescription = (image) => {
    if (!image.available) {
      return `${t.notavailable}`;
    } else if (image.description === "1") {
      return `${image.description} ${t.piece}`;
    } else {
      return `${image.description} ${t.pieces}`;
    }
  };

  return (
    <Layout title={t.print}>
      <div className={styles.printInfoContainer}>
        <BlockContent
          blocks={router.locale === "cs" ? print.cs : print.en}
          noLanguage
        />
      </div>
      <div className={styles.printPhotoContainer}>
        {print?.gallery?.map((image) => {
          return (
            <div>
              <h1>{getImageDescription(image)}</h1>
              <div
                key={image._key}
                className={`${styles.printPhotoWrap} ${
                  !image.available ? styles.printPhotoAvailable : ""
                }`}
              >
                <Figure
                  image={getImage(image)}
                  alt={""}
                  sizes={`
                    (min-width: 2560px) calc(100vw / 5 - 6 * 1.42rem),
                    (min-width: 1400px) calc(100vw / 4 - 5 * 1.42rem),
                    (min-width: 1025px) calc(100vw / 3 - 4 * 1.42rem),
                    (min-width: 768px) calc(100vw / 2 - 3 * 1.42rem),
                    calc(100vw - 2 * 1.42rem)
                    `}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const print = await client.fetch(
    `
    *[_id == "print"]  [0] {
      ...,
      "gallery":gallery[]{..., asset->{...}},
      }
    
    `,
    ""
  );

  return {
    props: {
      ...print,
    },
    revalidate: 10,
  };
}
