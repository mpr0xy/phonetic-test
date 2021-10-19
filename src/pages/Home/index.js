import React from 'react';
import classnames from 'classnames';
import {
  Link
} from 'react-router-dom';
import styles from './index.module.scss';
const Home = () => {
  return (
    <div className={classnames('page', styles.home)}>
      <p className={styles.desc}>
        这是一款练习听单词，识别单词包含音标的应用。目的是检测使用者是否能听到单词发音和看到单词后，推断出单词的音标。
      </p>
      <div className={styles.choose}>
        <Link to='/learn'>
          <button className={styles.learn}>学习音标</button>
        </Link>
        <Link to='/practice'>
          <button className={styles.practice}>练习音标</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
