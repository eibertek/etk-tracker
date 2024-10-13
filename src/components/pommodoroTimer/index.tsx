import { Box, Flex } from '@chakra-ui/core';
import { createIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';

const PlayButton = createIcon({
    displayName: "PlayButton",
    viewBox: "0 0 64 64",
    path: (
        <>
            <path
                fill="currentColor"
                d="M46.014 31.105L25.197 20.697a1.003 1.003 0 00-1.447.895v20.816a1 1 0 001.447.895l20.817-10.408a1 1 0 000-1.79zM25.75 40.79V23.21L43.33 32l-17.58 8.79z"
            />
            <path
                fill="currentColor"
                d="M32 0C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0zm0 62C15.458 62 2 48.542 2 32S15.458 2 32 2s30 13.458 30 30-13.458 30-30 30z"
            />
        </>
    ),
});

const PauseIcon = createIcon({
    displayName: "StopIcon",
    viewBox: "0 0 512 512",
    path: (
        <>
          <path
            fill="currentColor"
            d="M256 0C114.842 0 0 114.842 0 256s114.842 256 256 256 256-114.842 256-256S397.158 0 256 0zm0 465.455c-115.493 0-209.455-93.961-209.455-209.455S140.507 46.545 256 46.545 465.455 140.507 465.455 256 371.493 465.455 256 465.455z"
          />
          <path
            fill="currentColor"
            d="M318.061 139.636c-12.853 0-23.273 10.42-23.273 23.273v186.182c0 12.853 10.42 23.273 23.273 23.273s23.273-10.42 23.273-23.273V162.909c-.001-12.853-10.421-23.273-23.273-23.273z"
          />
          <path
            fill="currentColor"
            d="M193.939 139.636c-12.853 0-23.273 10.42-23.273 23.273v186.182c0 12.853 10.42 23.273 23.273 23.273s23.273-10.42 23.273-23.273V162.909c0-12.853-10.42-23.273-23.273-23.273z"
          />
        </>
      ),
  });

const StopIcon = createIcon({
    displayName: "StopIcon",
    viewBox: "0 0 512 512",
    path: (
      <>
        <path
          fill="currentColor"
          d="M256 0C114.844 0 0 114.844 0 256s114.844 256 256 256 256-114.844 256-256S397.156 0 256 0zm0 490.667C126.604 490.667 21.333 385.396 21.333 256 21.333 126.604 126.604 21.333 256 21.333S490.667 126.604 490.667 256c0 129.396-105.271 234.667-234.667 234.667z"
        />
        <path
          fill="currentColor"
          d="M329.333 171.052H180c-5.891 0-10.667 4.776-10.667 10.667v149.333c0 5.891 4.776 10.667 10.667 10.667h149.333c5.891 0 10.667-4.776 10.667-10.667V181.719c0-5.891-4.776-10.667-10.667-10.667zm-10.666 149.333h-128v-128h128v128z"
        />
      </>
    ),
  });


interface IPommodoroTimerProps {
    taskName: string;
};

const IDLE = "idle";
const PLAYING = "playing";
const PAUSE = "pause";
const STOP = "stop";


const PommodoroTimer = ({ taskName }: IPommodoroTimerProps) => {
    const [ time, setTime ] = useState(0);
    const [ status, setStatus ] = useState(IDLE);
    const [ intervalId, setIntervalId ] = useState(null as unknown as NodeJS.Timeout);
    const addTime = () => {
        setTime((t) => t + 1);
    };

    useEffect(()=>{
        if(status === PLAYING) {
            const intId = setInterval(addTime, 1000);
            setIntervalId(intId);
        }

        if(status === PAUSE) {
            clearInterval(intervalId);
        }

        if(status === STOP) {
            clearInterval(intervalId);
            setTime(0);
        }

        return () => clearInterval(intervalId);

    },[status]);
    
    const printTime = (t: number) => {
        const hours = (t/60/60 < 10 ? "0" : "") + parseInt((t/60/60).toString());
        const minutes = ((t/60)%60 < 10 ? "0" : "") + parseInt((t/60).toString())%60;
        const seconds = (t%60 < 10 ? "0" : "") + (t%60).toString();

        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <Flex direction={'column'} gridColumn={"Flex"} gap={3}>
            <Box h={10}>Task {taskName}</Box>
            <Box h={10}>Lapse: {printTime(time)}</Box>
            <Flex direction={'row'}>
            {status !== PLAYING && <Box p={3} onClick={()=>setStatus(PLAYING)}>
                    <PlayButton width={"200px"} height={"200px"} />
                </Box>}
                {status === PLAYING && <Box p={3} onClick={()=>setStatus(PAUSE)}>
                    <PauseIcon width={"200px"} height={"200px"} />
                </Box>}
                <Box p={3} onClick={()=>setStatus(STOP)}><StopIcon width={"200px"} height={"200px"} /></Box>
            </Flex>
        </Flex>
    );
};

export default PommodoroTimer;