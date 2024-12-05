import imageUrlBuilder from "@sanity/image-url";
import client from "../client";
import Image from "next/image";
import { animated } from '@react-spring/web'


const builder = imageUrlBuilder(client);

export default function AnimatedFigure(props) {
  const getWidth = () => {
    if (typeof props.width !== "undefined" && props.width !== null) {
      return props.width;
    } else {
      return 600;
    }
  };

  const getHeight = () => {
    if (typeof props.height !== "undefined" && props.height !== null) {
      return props.height;
    } else {
      if (typeof props.image.metadata?.dimensions.aspectRatio !== "undefined") {
        // console.log(props.image.metadata.dimensions);
        return 600 / props.image.metadata.dimensions.aspectRatio;
      } else {
        return (600 / 16) * 9;
      }
    }
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={props.class != null ? props.class : ""}
      // style={props.style != null ? props.style : ""}
      width={getWidth()}
      // height={getHeight()}
      src={builder.image(props.image).auto("format").width(getWidth()).url()}
      alt={props.alt}
      sizes="70vmin"
      srcSet={`
                          ${builder
                            .image(props.image)
                            .auto("format")
                            .width(480)
                            .url()} 480w,
                          ${builder
                            .image(props.image)
                            .auto("format")
                            .width(800)
                            .url()} 800w,
                          ${builder
                            .image(props.image)
                            .auto("format")
                            .width(1400)
                            .url()} 1400w,
                          ${builder
                            .image(props.image)
                            .auto("format")
                            .width(1800)
                            .url()} 1600w,
                          ${builder
                            .image(props.image)
                            .auto("format")
                            .width(2500)
                            .url()} 2000w,
                        `}
    />
  );
}
