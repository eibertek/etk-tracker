
import React, { useState } from 'react'
import PommodoroTimer, { IRegistry } from '../pommodoroTimer'
import { Box } from '@chakra-ui/react';
import { format } from 'date-fns';

const WORK = "work";
const PAUSE = "pause";
const FINISH = "finish";
interface ITaskProps {
    taskName: string;
}

type ICycleType = "work" | "pause" | "finish";

export const TaskComponent = ({ taskName }:ITaskProps) => {
  const [ pommodoro, setPommodoro ] = useState(1);
  const [actualCycle, setCycle] = useState(WORK as ICycleType);
  const [ registry, setRegistry] = useState([] as IRegistry[]);
  const times = {
    [WORK]: 60*25, 
    [PAUSE]: 60*5,
  };
  
  const finishPommodoro = () => {
    if(actualCycle === WORK) {
        setPommodoro(pommodoro+1);
        setCycle(PAUSE);
    }
    if(actualCycle === PAUSE) {
        setCycle(WORK);
    };
  }; 

  const finishTask = (registry: IRegistry[]) => {
        setCycle(FINISH);
        setRegistry(registry);
  }; 

  return (
    <div>
        Pommodoros: {pommodoro}
        {actualCycle !== FINISH && <PommodoroTimer 
            backwards={true} 
            taskName={taskName} 
            startTime={times[actualCycle]} 
            register={actualCycle===WORK} 
            onStop={finishPommodoro}
            onFinish={finishTask} 
        />}
        {actualCycle === FINISH && <Box>
            {registry.map((reg, index) =>
                <Box key={`registry_${index}`}>{format(reg.date, "MM/dd/yyyy HH:mm:ss")} - {reg.time} -  {reg.description ? reg.description : "No description"}</Box>
              )}
            </Box>}
    </div>
  )
}
