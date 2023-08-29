import type { Meta, StoryObj } from '@storybook/react';
import { VideoIntro } from './videoIntro';
import { userEvent, within, } from '@storybook/testing-library';
import { expect } from '@storybook/jest'



const meta: Meta<typeof VideoIntro> = {
    title: 'Component/VideoIntro',
    component: VideoIntro,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VideoIntro>

export const Primary: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const video = canvas.getByTestId('video')
        await expect(video).toBeInTheDocument()
        await expect(video).toHaveProperty('muted', true)
        await userEvent.click(video)
    }
};
