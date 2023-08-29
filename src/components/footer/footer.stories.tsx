import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './footer';
import { MemoryRouter } from 'react-router-dom';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest'


const meta: Meta<typeof Footer> = {
    title: 'Component/Footer',
    component: Footer,
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
type Story = StoryObj<typeof Footer>

export const Primary: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const image = canvas.getByRole('img')
        await expect(image).toBeInTheDocument()
        await expect(image).toHaveAttribute('src', 'e08e4e4bae345287266b.png')
        const link = canvas.getByRole('link')
        await expect(link).toHaveAttribute('href', 'https://github.com/SusanaSalmeron?tab=repositories')
        await expect(link).toHaveTextContent('©2023 by Pochi')
    }

}
