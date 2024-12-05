import styles from "../styles/Draggable.module.scss";

import Draggable from "react-draggable";
import BlockContent from "./BlockContent";
import AccordionBlock from "./blocks/AccordionBlock";

import useSWR from "swr";
import sanityClient from "@sanity/client";
import groq from "groq";

import { useRouter } from "next/router";
import cs from "./languages/cs";
import en from "./languages/en";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function About(props) {
  const router = useRouter();
  const t = router.locale === "cs" ? cs : en;

  const [image, setImage] = useState(null);
  const { theme, setTheme } = useTheme();

  const client = sanityClient({
    projectId: "3w5q4fmv",
    dataset: "pzdataset",
    useCdn: true,
  });
  const { data, error } = useSWR(
    groq`*[_id == "about"][0]{
    ...,
    "textCs":textCs[]{..., asset->{...}},
    "textEn":textEn[]{..., asset->{...}},
    "file": file{..., asset->{...}},
    "clients":clients.images[]{..., asset->{...}},

  }`,
    (query) => client.fetch(query)
  );

  useEffect(() => {
    if (data != null) {
      if (theme === "highTech" && data?.imageNormal != null) {
        setImage(data.imageNormal);
      } else if (theme === "lowTech" && data?.imageLow != null) {
        setImage(data.imageLow);
      }
    }
  }, [data, theme]);

  const getContent = () => {
    if (error) {
      return "Error...";
    } else if (!data) {
      return "";
    } else {
      return (
        <BlockContent
          blocks={router.locale === "cs" ? data.textCs : data.textEn}
          noLanguage
        />
      );
    }
  };

  return (
    <div className={styles.boundParent}>
      <Draggable handle="span" bounds="parent">
        <div className={styles.draggableContainer}>
          <span>
            <div className={styles.draggableHeader}>{t.about}</div>
          </span>
          <div onClick={props.handleClose} className={styles.draggableClose}></div>
          <div className={styles.draggableContent}>
            <div className={styles.aboutLinks}>
              <a href="mailto:petr@zem.la">petr@zem.la</a>
              <a href="https://instagram.com/zem.la" target="_blank">
                Instagram
              </a>
              <a href={data?.file.asset.url} target="_blank">
                {data?.file.description}
              </a>
            </div>

            {getContent()}
            <AccordionBlock title={t.clientTitle} images={data?.clients} />

          </div>
        </div>
      </Draggable>
    </div>
  );
}
