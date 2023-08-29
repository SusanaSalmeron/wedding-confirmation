import type { Meta, StoryObj } from '@storybook/react';
import { Info } from './info';
import { MemoryRouter } from 'react-router-dom';
import { within } from '@storybook/testing-library';


const meta: Meta<typeof Info> = {
    title: 'Showing maps/Info map',
    component: Info,
    decorators: [(Story) => (<MemoryRouter><Story /></MemoryRouter>)],
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Info>

export const Primary: Story = {
    args: {
        src: "",
        title: "hola"
    },


    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)

    }

}
