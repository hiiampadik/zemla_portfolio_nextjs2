import styles from "../styles/Commercial.module.scss";
import Layout from "../components/Layout";
import Figure from "../components/Figure";

import Draggable from "react-draggable";

import client from "../client";
import {useMemo, useState} from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

import cs from "../components/languages/cs";
import en from "../components/languages/en";

export default function Commercial(commercial) {
  const router = useRouter();
  const t = router.locale === "cs" ? cs : en;

  const { theme } = useTheme();
  const [zIndexes, setZIndexes] = useState(commercial?.galleryArrayWithTags.map((_, index) => index));
  const [showGrab, setShowGrab] = useState(true);
  const [filter, setFilter] = useState(null)

  const gallery = useMemo(() => {
    if (commercial?.galleryArrayWithTags){
      let filteredAssets;

      // get selected quality
      if (theme === 'highTech'){
        filteredAssets = commercial.galleryArrayWithTags.map(item => {
          return {alt: item.alt, image: item.high.asset, myTags: item.myTags.map(item => item.value)}
        })
      } else if (theme === 'lowTech') {
        filteredAssets = commercial.galleryArrayWithTags.map(item => {
          return {alt: item.alt, image: item.low.asset, myTags: item.myTags.map(item => item.value)}
        })
      }
      return filteredAssets
    }
    return [];
  }, [commercial, theme])

  const changeZ = (index) => {
    let newZ = [...zIndexes];
    let thresholdIndex = newZ[index];

    for (let i = 0; i < newZ.length; i++) {
      if (newZ[i] > thresholdIndex) {
        newZ[i] = newZ[i] - 1;
      }
    }
    newZ[index] = newZ.length;

    setZIndexes(newZ);
  };

  const getStyles = () => {
    if (theme === "highTech") {
      return styles.commercialGrabHigh;
    } else if (theme === "lowTech") {
      return styles.commercialGrabLow;
    }
  };

  const handleFilter = (newFilter) => {
    if (newFilter === filter){
      setFilter(null)
    } else {
      setFilter(newFilter)
    }
  }

  return (
    <Layout title={t.commercial}>
      <div className={styles.boundParent}>
        <div className={styles.filterContainer}>
          <button onClick={() => handleFilter('design')} className={filter === 'design' ? styles.selected : ''}>{t.design}</button>
          <button onClick={() => handleFilter('fashion')} className={filter === 'fashion' ? styles.selected : ''}>{t.fashion}</button>
          <button onClick={() => handleFilter('interior')} className={filter === 'interior' ? styles.selected : ''}>{t.interior}</button>
          <button onClick={() => handleFilter('architecture')} className={filter === 'architecture' ? styles.selected : ''}>{t.architecture}</button>
          <button onClick={() => handleFilter('food')} className={filter === 'food' ? styles.selected : ''}>{t.food}</button>
          <button onClick={() => handleFilter('jewelry')} className={filter === 'jewelry' ? styles.selected : ''}>{t.jewelry}</button>
        </div>

        {gallery?.map((item, i) => (
            <CommercialItem item={item} zIndexes={zIndexes} index={i} changeZ={changeZ} setShowGrab={setShowGrab} filter={filter}/>)
        )}
      </div>
      {showGrab && <div className={`${styles.commercialGrab} ${getStyles()}`} />}
    </Layout>
  );
}


function CommercialItem({zIndexes, item, index, changeZ, setShowGrab=setShowGrab, filter}) {

  const [loaded, setLoaded] = useState(false)

    return (
        <Draggable
            key={item._key}
            bounds="parent"
            defaultPosition={{
              x: Math.floor(Math.random() * 150),
              y: Math.floor(Math.random() * 200),
            }}
            onStart={() => {
              changeZ(index)
              setShowGrab(false)
            }}
        >
      <div
          className={`${styles.commercialFigureContainer} ${loaded ? styles.loaded: styles.notLoaded}`}
          style={{zIndex: zIndexes?.[index] ?? 0, display: filter === null || item.myTags.includes(filter) ? 'block' : 'none'}}
      >
        <Figure
            handleLoaded={() => setLoaded(true)}
            image={item.image}
            alt={item.alt}
            sizes={`
                      (min-width: 1025px) calc(40vw - 1.43rem * 3), 
                      (min-width: 768px) calc(50vw - 1.43rem * 3), 
                      calc(70vw - 1.43rem * 3) 
                      `}
        />
      </div>
        </Draggable>
  )
}


export async function getStaticProps(context) {
  const commercial = await client.fetch(
      `
    *[_id == "commerce"]  [0] {
      ...,
      "galleryNormal":galleryNormal[]{..., asset->{...}},
      "galleryLow":galleryLow[]{..., asset->{...}},
      }
    
    `,
      ""
  );

  // galleryArrayWithTags

  return {
    props: {
      ...commercial,
    },
    revalidate: 10,
  };
}
