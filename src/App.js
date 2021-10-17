// import logo from './logo.svg';
import React, { useState, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring'
import './App.css';
import phoneticData from './data';
import WordInfoPron from './components/WordInfoPron/index';

const getRandomByLength = (length) => {
  return Math.floor(Math.random() * 1000 % length);
};

const getRandomPhonetic = () => {
  const pLength = phoneticData.length;
  return phoneticData[getRandomByLength(pLength)];
};

const getAllWord = () => {
  const wordList = [];
  phoneticData.forEach((phonetic) => {
    const { letterCombination } = phonetic;
    for (let letter in letterCombination) {
      letterCombination[letter].forEach((wordInfo) => {
        wordList.push({
          phoneticName: phonetic.name,
          phoneticPronunciation: phonetic.pronunciation,
          word: wordInfo.word,
          wordPhonetic: wordInfo.phonetic
        });
      });
    }
  });
  return wordList;
};
let randomPhonetic = {};
function App() {
  const [wordInfo, setWordInfo] = useState({});
  const [isShowAns, setShowAns] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [isShowLetter, setShowLetter] = useState(false);
  const [allWords] = useState(() => { return getAllWord() });
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
    const pLength = allWords.length;
    const oneIndex = getRandomByLength(pLength);
    // const phonetic = phoneticData[oneIndex];
    // let wordList = [];
    // for (let letter in phonetic.letterCombination) {
    //   wordList = wordList.concat(phonetic.letterCombination[letter]);
    // }
    // const wordIndex = getRandomByLength(wordList.length);
    if (allWords[oneIndex].word === wordInfo.word) {
      next();
      return;
    }
    setTimeout(() => {
      setShowAns(false);
      setWordInfo(allWords[oneIndex]);
      setReverse(false);
      setShowLetter(false);
      randomPhonetic = getRandomPhonetic();
    }, 200);
  }, []);
  const playAudio = useCallback(() => {
    const audio = new Audio(`https://dict.youdao.com/dictvoice?audio=${wordInfo.word}&type=1`);
    audio.play();
  }, [wordInfo]);
  useEffect(() => {
    next();
  }, []);
  useEffect(() => {
    playAudio();
  }, [wordInfo, playAudio]);
  const getRandomByLength = (length) => {
    return Math.floor(Math.random() * 1000 % length);
  };
  return (
    <div className="App">
      <div className="layout">
        <WordInfoPron wordInfo={wordInfo} next={next} />
        <animated.div style={animateStyle} className="content">
          <p className="word" onClick={playAudio}>{wordInfo.word}</p>
          {
            !isShowAns &&
              <span className="ans" onClick={() => setShowAns(true)}>显示答案</span>
          }
          {
            isShowAns &&
              <span className="ans">{wordInfo.wordPhonetic}</span>
          }
          <button className="nextText" onClick={next}>下一题</button>
        </animated.div>
        <audio controls src={randomPhonetic.pronunciation} />
        {
          !isShowLetter && 
            <span className="ans" onClick={() => setShowLetter(true)}>显示音标</span>
        }
        {
          isShowLetter &&
          <span className="ans">[{randomPhonetic.name}]</span>
        }
      </div>
    </div>
  );
}

export default App;
