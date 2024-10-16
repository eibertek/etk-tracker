import PommodoroTimer from '@/components/pommodoroTimer';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import { customTheme } from '@/components/pommodoroTimer/theme';


const StoryComponent = (props: any) => {
  return (    
  <ChakraProvider theme={customTheme}>
    <PommodoroTimer {...props} />
  </ChakraProvider>      
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Etk-tracker/Pommodoro Timer',
  component: StoryComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    taskName: { control: 'text' },
    startTime: { control: 'number' },
    backwards: { control: 'boolean' }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { taskName: "My First Task" },
} satisfies Meta<typeof PommodoroTimer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    taskName: "My first task",
  },
};
