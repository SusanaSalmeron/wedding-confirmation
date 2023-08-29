import type { Meta, StoryObj } from '@storybook/react';
import { Home } from './home';
import { MemoryRouter } from 'react-router-dom';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest'


const meta: Meta<typeof Home> = {
    title: 'Component/Home',
    component: Home,
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
};

export default meta;
type Story = StoryObj<typeof Home>

export const home: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const video = canvas.getByTestId('video')
        await expect(video).toBeInTheDocument()
        const buttons = canvas.getAllByRole('button')
        await expect(buttons).toHaveLength(2)
        await expect(buttons[0]).toHaveTextContent("Vamos a asistir")
        await expect(buttons[1]).toHaveTextContent("No asistiremos")
        await userEvent.click(buttons[0])
        await userEvent.click(buttons[1])
    }
}
