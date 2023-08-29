import type { Meta, StoryObj } from '@storybook/react';
import { WeddingForm } from './weddingForm';
import { MemoryRouter } from 'react-router-dom';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import ReactModal from 'react-modal';



const meta: Meta<typeof WeddingForm> = {
    title: 'Form/WeddingForm',
    component: WeddingForm,
    decorators: [(Story) => (<MemoryRouter>
        <Story />
    </MemoryRouter>)],
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

ReactModal.setAppElement('#root')

export default meta;
type Story = StoryObj<typeof WeddingForm>




export const Primary: Story = {

    /*  play: async ({ canvasElement }) => {
         const canvas = within(canvasElement)
     } */
}