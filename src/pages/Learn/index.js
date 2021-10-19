import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import {
  Link
} from 'react-router-dom';
import styles from './index.module.scss';
import { getPhoneticList } from '../../model/index';

// const LearnList = [];
// for (let i = 0; i < metaData.length; i = i + 4) {
//   LearnList.push([
//     metaData[i],
//     metaData[i + 1],
//     metaData[i + 2],
//     metaData[i + 3]
//   ]);
// }
const Learn = () => {
  const [listDom, setListDom] = useState(null);
  useEffect(() => {
    const list = getPhoneticList();
    const dom = list.map((item, index) => {
      return (
        <Link key={index} to={`/learn/${index}`}>
          <li className={styles.phoneticList}>
            <span>{item[0]}</span>
            <span>{item[1]}</span>
            <span>{item[2]}</span>
            <span>{item[3]}</span>
            <p className={styles.day}>Day{index + 1}</p>
          </li>
        </Link>
      );
    });
    setListDom(dom);
  }, []);
  return (
    <div className={classnames('page', styles.learn)}>
      <h3 className={styles.title}>点击卡片进入学习</h3>
      <ul>{listDom}</ul>
    </div>
  );
};

export default Learn;