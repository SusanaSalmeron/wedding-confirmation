import type { Meta, StoryObj } from '@storybook/react';
import { InfoMessage } from './infoMessage';
import { MemoryRouter } from 'react-router-dom';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest'




const meta: Meta<typeof InfoMessage> = {
    title: 'Showing Messages/InfoMessage',
    component: InfoMessage,
    decorators: [(Story) => (<MemoryRouter><Story /></MemoryRouter>)],
    parameters: {
        backgrounds: {
            values: [
                { name: 'white', value: '#fff' },
                { name: 'black', value: '#000' },
                { name: 'dark', value: '#222' },
                { name: 'light', value: '#ddd' }
            ],
        },
    },
    tags: ['autodocs']

}

export default meta;
type Story = StoryObj<typeof InfoMessage>

export const Primary: Story = {
    args: {
        message: "",
        image: "",
        alt: "",
        link: "",
        email: "bodatyj071023@gmail.com"
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const image = canvas.getByRole('img')
        await expect(image).toBeInTheDocument()
    }
}