import styles from "../../styles/Projects.module.scss";

import BlockContent from "../../components/BlockContent";
import GalleryBlock from "../../components/blocks/GalleryBlock";

import Layout from "../../components/Layout";
import client from "../../client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

export default function Project(project) {
  const router = useRouter();

  const [gallery, setGallery] = useState(null);
  const { theme, setTheme } = useTheme();


  useEffect(() => {
    if (theme === "highTech" && project?.galleryNormal != null) {
      setGallery(project.galleryNormal);
    } else if (theme == "lowTech" && project?.galleryLow != null) {
      setGallery(project.galleryLow);
    }
  }, [project, theme]);

  return (
    <Layout title={router.locale === "cs" ? project.nameCs : project.nameEn}>
      <div className={styles.projectContainer}>
        {gallery ? <GalleryBlock images={gallery} /> : ""}
      </div>

      <div className={styles.projectInfoContainer}>
        <BlockContent
          blocks={router.locale === "cs" ? project.cs : project.en}
          noLanguage
        />
      </div>
    </Layout>
  );
}

export async function getStaticPaths(context) {
  const paths = await client.fetch(`
    *[_type == "projects" && defined(slug.current)][].slug.current
  `);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { project, morePosts } = await client.fetch(
    `
    {  "project": *[_type == "projects" && slug.current == $slug] | order(_updatedAt desc) [0] {
        ...
      }}  
    `,
    { slug: params.slug }
  );

  return {
    props: { ...project },
    revalidate: 10, // In seconds
  };
}
