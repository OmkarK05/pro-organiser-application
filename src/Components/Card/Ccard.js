import React, { Fragment, useState } from "react";
import { Card, CardTitle } from "reactstrap";
import styles from "./Card.module.css";

import EditDeleteIcons from "../EditDeleteIcons/EditDeleteIcons";

const Ccard = ({ cardKey, value, viewCard }) => {
  // const [members, setMembers] = useState([]);

  console.log(value.members);

  return (
    <Fragment>
      <Card
        onClick={() => viewCard(cardKey)}
        className={styles.card}
        key={cardKey}
        value={value}
        id={cardKey}
      >
        <CardTitle>{value.taskTitle}</CardTitle>
        <div className={styles.footer}>
          <EditDeleteIcons></EditDeleteIcons>
          <span className={styles.circle}>
            <span className={styles.name}>Aj</span>
          </span>
        </div>
      </Card>
    </Fragment>
  );
};

export default Ccard;
