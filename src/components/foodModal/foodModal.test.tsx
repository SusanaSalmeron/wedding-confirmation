import { render, screen, waitFor } from "@testing-library/react"
import FoodModal from "./foodModal"
import { BrowserRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event";



describe("<FoodModal/>", () => {
    test("should show a modal correctly", async () => {
        const user = userEvent.setup()
        render(
            <BrowserRouter>
                <FoodModal callback={() => (true)} dataGroup={{ id: "1", group: "Susana y Rubén", people: ["Susana", "Rubén"], size: 2, available: true }} selectedGuests={[]} />
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
        expect(buttons[1]).toBeDisabled()
        expect(buttons[2]).toHaveTextContent("X")
        const select = screen.getByRole('combobox')
        expect(select).toBeInTheDocument()
        const options = screen.queryAllByRole('option')
        await waitFor(() => {
            expect(options).toHaveLength(3)
        })
        const titles = screen.getAllByRole('heading')
        expect(titles).toHaveLength(2)
        expect(titles[0]).toHaveTextContent("* Elije un menú:")
        expect(titles[1]).toHaveTextContent("Marca tus intolerancias o alergias:")
        const radioButtons = screen.getAllByRole("radio")
        expect(radioButtons).toHaveLength(3)
        expect(radioButtons[0]).toHaveAccessibleName("Principal Principal")
        expect(radioButtons[1]).toHaveAccessibleName("Infantil Infantil")
        expect(radioButtons[2]).toHaveAccessibleName("Veggie Veggie")
        const images = screen.getAllByRole('img')
        expect(images).toHaveLength(12)
        const checkboxes = screen.getAllByRole("checkbox")
        expect(checkboxes).toHaveLength(9)
    });
    test("should enable button when form is valid", async () => {
        const user = userEvent.setup()
        const callback = jest.fn().mockReturnValueOnce(true)
        render(
            <BrowserRouter>
                <FoodModal callback={callback} dataGroup={{ id: "1", group: "Susana y Rubén", people: ["Susana", "Rubén"], size: 2, available: true }} selectedGuests={[]} />
            </BrowserRouter>
        )
        const addButton = screen.getByRole("button")
        user.click(addButton)
        const myModal = await screen.findByRole('dialog')
        expect(myModal).toBeInTheDocument()
        const buttons = await screen.findAllByRole('button')
        expect(buttons[1]).toBeDisabled()
        const select = screen.getByRole('combobox')
        user.selectOptions(select, "Susana")
        const radioButtons = screen.getAllByRole("radio")
        user.click(radioButtons[0])
        await waitFor(() => {
            expect(buttons[1]).toBeEnabled()
        })
        user.click(buttons[1])
        await waitFor(() => {
            expect(callback).toHaveBeenCalledTimes(1)
        })
        await waitFor(() => {
            expect(myModal).not.toBeInTheDocument()
        })
    });
});