import React, {} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  const playSongHandler = () => {
    // console.log(audioRef.current)

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // const timeUpdateHandler = (e) => {
  //   const current = e.target.currentTime;
  //   const duration = e.target.duration;
  //   console.log(current);
  //   setSongInfo({ ...songInfo, currentTime: current, duration });
  // };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  // const [songInfo, setSongInfo] = useState({
  //   currentTime: 0,
  //   duration: 0,
  // });

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    const curentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
     await setCurrentSong(songs[(curentIndex + 1) % songs.length]);
     activeLibraryHandler(songs[(curentIndex + 1) % songs.length])
    }
    if (direction === "skip-back") {
      if (curentIndex % songs.length === -1) {
      await  setCurrentSong(songs[songs.length - 1]);
      activeLibraryHandler(songs[songs.length - 1])
        if(isPlaying) audioRef.current.play()

        return;
      }
       await setCurrentSong(songs[(curentIndex + 1) % songs.length]);
    }
   if(isPlaying) audioRef.current.play()
  };

  // useEffect(() => {
  //   const newSongs = songs.map((song) => {
  //     if (song.id === currentSong.id) {
  //       return {
  //         ...song,
  //         active: true,
  //       };
  //     } else {
  //       return {
  //         ...song,
  //         active: false,
  //       };
  //     }
  //   });
  //   setSongs(newSongs);
  // }, [currentSong]);

  const activeLibraryHandler = (nextPrev)=>{
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  }

  //  styling input

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;