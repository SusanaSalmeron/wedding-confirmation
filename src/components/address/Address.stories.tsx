import type { Meta, StoryObj } from '@storybook/react';
import { Address } from './address';
import { MemoryRouter } from 'react-router-dom';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest'


const meta: Meta<typeof Address> = {
    title: 'Showing Address/Address',
    component: Address,
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
type Story = StoryObj<typeof Address>

export const Primary: Story = {
    args: {
        description: "¿Dónde es la ceremonia?",
        link: "https://goo.gl/maps/hXDQEvHWxbApMznZ9",
        address: "Colegiata San Bartolome - 16640 4, C.José Antonio González, 16640 Belmonte, Cuenca",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3075.9701993091335!2d-2.7052341235241943!3d39.56027950731938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd686b8b6f72abad%3A0xfca6e5d30eb1cd99!2sCollegiate%20of%20San%20Bartolom%C3%A9!5e0!3m2!1sen!2ses!4v1688114918638!5m2!1sen!2ses",
        title: "Colegiata San Bartolome"
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const title = canvas.getByRole('heading')
        await expect(title).toBeInTheDocument()
        const link = canvas.getByRole('link')
        await expect(link).toBeInTheDocument()
        await userEvent.click(link)
        const map = canvas.getByTestId('map')
        await expect(map).toBeInTheDocument()
    }
}