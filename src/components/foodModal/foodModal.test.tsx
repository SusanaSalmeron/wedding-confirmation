import { render, screen, waitFor } from "@testing-library/react"
import FoodModal from "./foodModal"
import { BrowserRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event";



describe("<FoodModal/>", () => {
    test("should show a modal correctly", async () => {
        const user = userEvent.setup()
        render(
            <BrowserRouter>
                <FoodModal callback={() => (true)} dataGroup={{ id: "1", group: "Susana y Rubén", people: ["Susana", "Rubén"], size: 2, available: true }} selectedGuests={[{ "guestName": "Susana", "menuType": "Principal", "allergies": ["Moluscos", "Cacahue."] }]} />
            </BrowserRouter>
        )
        const addButton = screen.getByRole("button")
        user.click(addButton)
        const myModal = await screen.findByRole('dialog')
        expect(myModal).toBeInTheDocument()
        const buttons = await screen.findAllByRole('button')
        expect(buttons).toHaveLength(3)
        expect(buttons[0]).toHaveTextContent("+")
        expect(buttons[1]).toHaveTextContent("Añadir")
        expect(buttons[2]).toHaveTextContent("X")
        const titles = screen.getAllByRole('heading')
        expect(titles).toHaveLength(2)
        const select = screen.getByRole('combobox')
        expect(select).toBeInTheDocument()
        const options = await screen.findAllByRole('option')
        /* await waitFor(() => {
            expect(options).toHaveLength(3)

        }) */

    });
});