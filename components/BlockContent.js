// import PortableText from '@sanity/block-content-to-react'
import { PortableText } from "@portabletext/react";
import AccordionBlock from "./blocks/AccordionBlock";
import GalleryBlock from "./blocks/GalleryBlock";

import Figure from "./Figure";
import styles from "../styles/Blocks.module.scss";

import { useRouter } from "next/router";
import { useTheme } from "next-themes";

export default function BlockContent({ blocks, style, noLanguage }) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const getImage = (image) => {
    if (theme === 'highTech'){
      return image.imageNormal.asset
    } else if (theme === 'lowTech'){
      return image.imageLow.asset
    }
  }


  const components = {
    types: {

      gallery: ({ value }) => {
        return (
          <GalleryBlock images={value.images} arrows={false} cover={true} />
        );
      },

      file: ({ value }) => {
        return (
          <a className={styles.file} target="_blank" href={value.asset.url}>{value.description}</a>
        );
      },

      images: ({ value }) => {
        return (
          <figure>
            <Figure
              image={getImage(value)}
              alt={value.description}
            />
            {value.description != null ? (
              <figcaption>{value.description}</figcaption>
            ) : (
              ""
            )}
          </figure>
        );
      },
    },
  };

  const getValue = () => {
    if (noLanguage) {
      return blocks;
    } else if (router.locale === "cs" && blocks?.cs != null) {
      return blocks.cs;
    } else if (blocks?.en != null) {
      return blocks.en;
    } else {
      return "";
    }
  };

  return (
    <div className={styles.blocks}>
      <PortableText
        value={getValue()}
        components={components}
        className={style}
        projectId="3w5q4fmv"
        dataset="pzdataset"
      />
    </div>
  );
}
