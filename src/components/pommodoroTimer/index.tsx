import { Box, Flex } from '@chakra-ui/core';
import { useEffect, useState } from 'react';
import { Textarea } from '@chakra-ui/react';
import { PauseIcon, PlayButton, StopIcon, FinishIcon } from './icons';
import { format } from 'date-fns';

interface IPommodoroTimerProps {
    taskName: string;
    startTime?: number;
    backwards?: boolean;
    onStop?: ()=>void;
    onFinish: (registry:any)=>void;
    register?: boolean;
};

export interface IRegistry {
  date: Date;
  description: String;
  time: number;
};

const IDLE = "idle";
const PLAYING = "playing";
const PAUSE = "pause";
const STOP = "stop";
const FINISH = "finish";


const PommodoroTimer = ({ taskName, startTime=0, backwards, onStop, register=true, onFinish }: IPommodoroTimerProps) => {
    const [ registry, setRegistry ] = useState([] as IRegistry[]);
    const [ time, setTime ] = useState(0);
    const [ description, setDescription ] = useState("");
    const [ status, setStatus ] = useState(IDLE);
    const [ intervalId, setIntervalId ] = useState(null as unknown as NodeJS.Timeout);

    const addTime = () => {
          setTime((t) => t + 1 );
    };

    useEffect(()=>{
      if(backwards && startTime - time===0) {
        const buzzAudio = document.getElementById('buzz') as HTMLAudioElement;
        buzzAudio && buzzAudio.play();
        setStatus(STOP);        
      };      
    }, [time]);

    const onKeyDown = (key:KeyboardEvent, status: string) => {
        if(key.code === 'Space'){
            if(status !== PLAYING) {
                setStatus(PLAYING);
            }else{
                setStatus(PAUSE);
            }
                
        }
        
        if(key.code === 'Enter') {
            setStatus(STOP);
        }
    };

    useEffect(()=>{
        document.addEventListener("keypress", (evt) => onKeyDown(evt, status));

        return () => {
            document.removeEventListener("keypress", (evt) => onKeyDown(evt, status));
        } 

    },[status]);

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
            register && setRegistry([...registry, { date: new Date(), time, description}]);
            setDescription("");
            onStop && onStop();            
        }

        if(status === FINISH) {
            onFinish && onFinish(registry);
        }
        return () => {
            document.removeEventListener("keypress", (evt) => onKeyDown(evt, status));
            clearInterval(intervalId);
        } 

    },[status]);
    
    const printTime = (tt: number) => {
        const t = backwards ? startTime - tt : tt; 
        const hours = (t/60/60 < 10 ? "0" : "") + parseInt((t/60/60).toString());
        const minutes = ((t/60)%60 < 10 ? "0" : "") + parseInt((t/60).toString())%60;
        const seconds = (t%60 < 10 ? "0" : "") + (t%60).toString();

        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <Flex direction={'column'} gridColumn={"Flex"} alignItems={"center"} gap={3} flexShrink={0}>
            <audio id='buzz' src="/buzzing.mp3"></audio>
            <Box h={10}>Task {taskName}</Box>
            <Box h={10}>Lapse: {printTime(time)}</Box>
            <Flex direction={'row'}>
            {status !== PLAYING && <Box p={3} onClick={()=>setStatus(PLAYING)}>
                    <PlayButton width={"100px"} height={"100px"} />
                </Box>}
                {status === PLAYING && <Box p={3} onClick={()=>setStatus(PAUSE)}>
                    <PauseIcon width={"100px"} height={"100px"} />
                </Box>}
                <Box p={3} onClick={()=>setStatus(STOP)}><StopIcon width={"100px"} height={"100px"} /></Box>
                <Box p={3} onClick={()=>setStatus(FINISH)}>{status !== PLAYING && <FinishIcon width={"100px"} height={"100px"} />}</Box>
            </Flex>
            <Box h={10}>Notes:</Box>
            <Box h={10} w={"100%"}>
                <Textarea width="100%" style={ {color:"#000", padding:"0.25rem"} } placeholder='Please fill here with the description needed' value={description} onChange={(evt)=>setDescription(evt.target.value)}/>
            </Box>
            <Box mt={5} maxH={"300px"} overflowY={'scroll'}>
              {registry.map((reg, index)=>
                <Box key={`registry_${index}`}>{format(reg.date, "MM/dd/yyyy HH:mm:ss")} - {reg.time} -  {reg.description ? reg.description : "No description"}</Box>
              )}
            </Box>
        </Flex>
    );
};

export default PommodoroTimer;