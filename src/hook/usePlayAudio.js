import { useState, useEffect,useRef } from 'react';
import log from '../utils/log';

const usePlayAudio = (src) => {
  const [isPlaying, setPlaying] = useState();
  const audioElementRef = useRef(null);
  if (src === null || src === '') {
    throw Error('usePlayAudio need a src path');
  }
  useEffect(() => {
    // 重复设置src的时候，不重新生成新的audio，只是重新加载数据而已
    if (audioElementRef.current) {
      audioElementRef.current.pause();
    } else {
      const audioIns = new Audio();
      audioIns.onended = () => {
        // 讲音频时间设置为0，这样音频就回到开头了
        audioIns.currentTime = 0;
      };
      audioElementRef.current = audioIns;
    }
    audioElementRef.current.src = src;
    audioElementRef.current.load();
    log.info('音频已经加装完毕', audioElementRef.current.src);
    return () => {
      audioElementRef.current.pause();
    };
  }, [src]);

  const _checkAudioEle = () => {
    if (!audioElementRef.current) {
      throw Error('没有可用的音频');
    }
  };
  const _playAudio = () => {
    try {
      audioElementRef.current.play().catch((e) => {});
    } catch (e) {}
    setPlaying(true);
  };
  const _pauseAudio = () => {
    try {
      audioElementRef.current.pause().catch((e) => {});
    } catch (e) {}
    setPlaying(false);
  };

  // 点击是播放，再点击一次是暂停，交替播放
  const togglePlay = () => {
    _checkAudioEle();
    if (isPlaying) {
      _pauseAudio();
    } else {
      _playAudio();
    }
  };
  
  // 先暂停，然后再重新播放
  const stopAndPlay = () => {
    _checkAudioEle();
    _pauseAudio();
    audioElementRef.current.load();
    _playAudio();
  };

  // 播放，再当前播放没有结束之前，再次调用这个函数无效
  const playToEnd = () => {
    _checkAudioEle();
    if (audioElementRef.current.currentTime) {
      return;
    }
    _playAudio();
  };

  // 暂停播放
  const pause = () => {
    if (!audioElementRef.current) {
      throw Error('没有可用的音频');
    }
    _pauseAudio();
  };

  return { 
    audioElementRef,
    isPlaying,
    play: togglePlay,
    pause,
    togglePlay, 
    stopAndPlay,
    playToEnd
  };
};

export default usePlayAudio;
