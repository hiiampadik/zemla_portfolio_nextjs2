import Layout from "../components/Layout";
import styles from "../styles/Homepage.module.scss";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import client from "../client";
import Figure from "../components/Figure";
import {Swiper, SwiperSlide, useSwiper} from "swiper/react";
import {Autoplay, EffectFade, Navigation} from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import 'swiper/css/navigation';


export default function Home(props) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [gallery, setGallery] = useState(null);

  useEffect(() => {
    if (theme === "lowTech") {
      setGallery(props.contact.galleryLow);
    } else {
      setGallery(props.contact.galleryNormal);
    }
  }, [theme]);

  return (
    <Layout>
      <Swiper
        loop={true}
        className={styles.homeSwiper}
        modules={[Autoplay, EffectFade, Navigation]}
        navigation={true}
        effect="fade"
        fadeEffect={{
          crossFade: true, // enables slides to cross fade
        }}
        // speed={700}
        autoplay={{
          delay: 4000,
        }}
      >
        {gallery?.map((image) => {
          return (
            <SwiperSlide lazy={true} key={image._key} className={styles.swiperSlide}>
              <Figure
                image={image}
                sizes={"(min-width: 768px) 70vw, (min-width: 576px) 80vw, 95vw"}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const contact = await client.fetch(
    `
    *[_id == "frontPage"]  [0] {
      ...,
      "galleryNormal":galleryNormal[]{..., asset->{...}},
      "galleryLow":galleryLow[]{..., asset->{...}},
      }
    
    `,
    ""
  );

  return {
    props: {
      contact,
    },
    revalidate: 10,
  };
}
