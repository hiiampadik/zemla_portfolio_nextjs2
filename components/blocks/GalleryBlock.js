import styles from "./GalleryBlock.module.scss";
import Figure from "../Figure";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Scrollbar } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function GalleryBlock(props) {

  return (
    <Swiper
      pagination={{
        type: "fraction",
      }}
      loop={true}
      navigation={true}
      modules={[Pagination, Navigation, Scrollbar]}
      className={styles.swiper}
    >
      {props.images?.map((el, index) => {
        return (
          <SwiperSlide lazy={true} key={index} className={styles.swiperSlide}>
            <Figure
              image={el.asset}
              sizes={`
                    (min-width: 576px) 80vw, 
                    calc(100vw - 1.42rem * 2)
                    `}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
