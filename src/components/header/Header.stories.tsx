import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './header';
import { MemoryRouter } from 'react-router-dom';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest'


const meta: Meta<typeof Header> = {
    title: 'Component/Header',
    component: Header,
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
}

export default meta;
type Story = StoryObj<typeof Header>

export const header: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const image = canvas.getByRole('img')
        await expect(image).toBeInTheDocument()
        await expect(image).toHaveAttribute('src', '8b1aeae6be0b2aee9f43.png')
    }
}