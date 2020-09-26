import React from 'react';
import styles from './index.less';

import {MapView} from 'mapu'

export default () => {
  return (
    <div>
        <div className={styles.top}></div>
        <div className={styles.main}>
          <div className={styles.left}></div>
          <div className={styles.center}></div>
          <div className={styles.right}></div>
        </div>
    </div>
  );
}
