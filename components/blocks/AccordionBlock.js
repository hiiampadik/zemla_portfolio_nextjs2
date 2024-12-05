import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import { PortableText } from "@portabletext/react";
import styles from "./AccordionBlock.module.scss";

import Figure from "../Figure";

export default function AccordionBlock(props) {
  return (
    <div className={styles.container}>
      <Accordion className={styles.accordion} allowZeroExpanded={true}>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton className={styles.accordionButton}>
              <h2>{props.title}</h2>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className={styles.accordionContent}>
              {props.images?.map((image) => {
                return (
                  <div key={image._key}>
                    <Figure image={image.asset} sizes={'calc(1.42rem * 4)'} />
                    <p>{image.caption}</p>
                  </div>
                );
              })}
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
