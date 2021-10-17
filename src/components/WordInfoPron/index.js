import React, { useState } from 'react';
import log from '../../utils/log';
import usePlayAudio from '../../hook/usePlayAudio';
import styles from './styles.module.scss';

const WordInfoPron = ({ wordInfo, next }) => {
  const [isShowAns, setShowAns] = useState(false);
  const { stopAndPlay } = usePlayAudio(`https://dict.youdao.com/dictvoice?audio=${wordInfo.word}&type=1`);
  const playAudio = () => {
    log.info('用户的点击单词, 开始播放音频');
    stopAndPlay();
  };
  return (
    <div>
      <p className={styles.wordLine} onClick={playAudio}>{wordInfo.word}</p>
      {
        !isShowAns &&
          <span className={styles.ans} onClick={() => setShowAns(true)}>显示答案</span>
      }
      {
        isShowAns &&
          <span className={styles.ans}>{wordInfo.wordPhonetic}</span>
      }
      <button className={styles.nextButton} onClick={next}>下一题</button>
    </div>
  )
};

export default WordInfoPron;
