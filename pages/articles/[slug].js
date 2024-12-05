import styles from "../../styles/Article.module.scss";

import BlockContent from "../../components/BlockContent";

import Layout from "../../components/Layout";
import client from "../../client";
import * as dayjs from "dayjs";

import { useRouter } from "next/router";
import Figure from "../../components/Figure";
import { useTheme } from "next-themes";

export default function Article(article) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const getDate = () => {
    const date = new Date(article._createdAt);
    if (router.locale == "cs") {
      return dayjs(date).format("DD. MM. YYYY");
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  const getContent = () => {
    if (Object.keys(article).length !== 0) {
      if (typeof article.en === "undefined" && router.locale === "en") {
        return (
          <>
            <div className={styles.articleLanguageWarningContainer}>
              <h1 className={styles.articleLanguageWarning}>
                This article is available only in Czech.
              </h1>
            </div>
            <div className={styles.articleTitleContainer}>
              <h1>{article.nameEn}</h1>
              <p>{getDate()}</p>
            </div>
            <div className={styles.articleFigure}>
              <Figure
                image={getImage(article.images)}
                alt={""}
                sizes={"(min-width: 768px) 70vw, (min-width: 576px) 80vw, 95vw"}
              />
            </div>
            <BlockContent blocks={article.cs} noLanguage />
          </>
        );
      }
      if (router.locale === "cs") {
        return (
          <>
            <div className={styles.articleTitleContainer}>
              <h1>{article.nameCs}</h1>
              <p>{getDate()}</p>
            </div>
            <div className={styles.articleFigure}>
              <Figure
                image={getImage(article.images)}
                alt={""}
                sizes={"(min-width: 768px) 70vw, (min-width: 576px) 80vw, 95vw"}
              />
            </div>
            <BlockContent blocks={article.cs} noLanguage />
          </>
        );
      } else {
        return (
          <>
            <div className={styles.articleTitleContainer}>
              <h1>{article.nameEn}</h1>
              <p>{getDate()}</p>
            </div>
            <div className={styles.articleFigure}>
              <Figure
                image={getImage(article.images)}
                alt={""}
                sizes={"(min-width: 768px) 70vw, (min-width: 576px) 80vw, 95vw"}
              />
            </div>
            <BlockContent blocks={article.en} noLanguage />
          </>
        );
      }
    }
  };

  const getImage = (images) => {
    if (theme == "highTech" && images?.high != null) {
      return images.high;
    } else if (theme == "lowTech" && images?.low != null) {
      return images.low;
    }
  };

  return (
    <Layout title={router.locale === "cs" ? article.nameCs : article.nameEn}>
      <div className={styles.articleContainer}>{getContent()}</div>
    </Layout>
  );
}

export async function getStaticPaths(context) {
  const paths = await client.fetch(`
    *[_type == "articles" && defined(slug.current)][].slug.current
  `);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { article } = await client.fetch(
    `
    {  "article": *[_type == "articles" && slug.current == $slug] | order(_updatedAt desc) [0] {
        ...
      }}  
    `,
    { slug: params.slug }
  );

  return {
    props: { ...article },
    revalidate: 10, // In seconds
  };
}
