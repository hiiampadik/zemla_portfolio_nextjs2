import styles from "../styles/Svatba.module.scss";

import BlockContent from "../components/BlockContent";


import client from "../client";


export default function Svatba(svatba) {


  return (
    <main>
      <div className={styles.svatbaWrap}>
        <div className={styles.svatbaContainer}>
          <BlockContent blocks={svatba.text} noLanguage />
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps(context) {
  const svatba = await client.fetch(
    `
    *[_id == "svatba"]  [0] {
      ...,
      }
    
    `,
    ""
  );

  return {
    props: {
      ...svatba,
    },
    revalidate: 10,
  };
}
