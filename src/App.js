// import logo from './logo.svg';
import React, { useState, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring'
import './App.css';
import phoneticData from './data';

const getRandomByLength = (length) => {
  return Math.floor(Math.random() * 1000 % length);
};

const getRandomPhonetic = () => {
  const pLength = phoneticData.length;
  return phoneticData[getRandomByLength(pLength)];
};

function App() {
  const [wordInfo, setWordInfo] = useState({});
  const [isShowAns, setShowAns] = useState(false);
  const [reverse, setReverse] = useState(false);
  const animateStyle = useSpring({
    to: async (next) => {
      await next({ opacity: reverse ? 0 : 1 });
    },
    from: {
      opacity: reverse ? 1 : 0
    },
    config: {
      duration: 200
    }
  });
  // 第一个题型，听到单词发音，写出单词音标。
  // 会出现单词的拼写
  const next = useCallback(() => {
    // 现在随机一个音标
    // 然后再音标里随机一个单词
    setReverse(true);
    const pLength = phoneticData.length;
    const oneIndex = getRandomByLength(pLength);
    const phonetic = phoneticData[oneIndex];
    let wordList = [];
    for (let letter in phonetic.letterCombination) {
      wordList = wordList.concat(phonetic.letterCombination[letter]);
    }
    const wordIndex = getRandomByLength(wordList.length);
    if (wordList[wordIndex].word === wordInfo.word) {
      next();
      return;
    }
    setTimeout(() => {
      setShowAns(false);
      setWordInfo(wordList[wordIndex]);
      setReverse(false);
    }, 200);
  }, []);
  const playAudio = useCallback(() => {
    const audio = new Audio(`https://dict.youdao.com/dictvoice?audio=${wordInfo.word}&type=1`);
    audio.play();
  }, [wordInfo]);
  useEffect(() => {
    next();
  }, [next]);
  useEffect(() => {
    playAudio();
  }, [wordInfo, playAudio]);
  const getRandomByLength = (length) => {
    return Math.floor(Math.random() * 1000 % length);
  };
  console.log(getRandomPhonetic().pronunciation);
  return (
    <div className="App">
      <div className="layout">
        <animated.div style={animateStyle} className="content">
          <p className="word" onClick={playAudio}>{wordInfo.word}</p>
          {
            !isShowAns &&
              <span className="ans" onClick={() => setShowAns(true)}>显示答案</span>
          }
          {
            isShowAns &&
              <span className="ans">{wordInfo.phonetic}</span>
          }
          <button className="nextText" onClick={next}>下一题</button>
        </animated.div>
        <audio controls src={getRandomPhonetic().pronunciation} />
      </div>
    </div>
  );
}

export default App;
