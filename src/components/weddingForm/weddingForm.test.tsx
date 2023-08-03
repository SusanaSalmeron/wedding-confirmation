import { render, screen, waitFor } from "@testing-library/react"
import WeddingForm from "./weddingForm"
import { BrowserRouter } from "react-router-dom"
import { ApiError, ApiResponse } from "../../services/attendants"

const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}))

describe("<WeddingForm/>", () => {
    const attendantsService = require("../../services/attendants")
    window.matchMedia = window.matchMedia || function () {
        return {
            matches: false,
            addListener: function () { },
            removeListener: function () { }
        };
    };

    test("shows correctly", async () => {
        const response = jest.spyOn(attendantsService, "getAttendantGroup").mockResolvedValue(new ApiResponse(
            200, { id: "3", group: "Minimou y Cia", people: ["Minimou", "Truscu"], size: 2, available: true }
        ))
        render(
            <BrowserRouter>
                <WeddingForm />
            </BrowserRouter>
        )
        await waitFor(() => {
            const image = screen.getByRole('img', { hidden: true })
            expect(image).toHaveAttribute("src", "form.jpg")
        })
        const greeting = screen.getByRole('heading')
        expect(greeting).toHaveTextContent('Hola Minimou y Cia')
        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes).toHaveLength(2)
        expect(checkboxes[0]).toHaveAccessibleName('¿Necesitáis alojamiento?')
        expect(checkboxes[0]).toHaveProperty('value', "false")
        expect(checkboxes[1]).toHaveAccessibleName('¿Os quedáis al brunch del 8/10?')
        expect(checkboxes[1]).toHaveProperty('value', "false")
        const buttons = screen.getAllByRole('button')
        expect(buttons).toHaveLength(2)
        expect(buttons[0]).toHaveTextContent('+')
        expect(buttons[1]).toHaveTextContent('Enviar')
        const menu = screen.getByText('* Añadir menú para aquellas personas que vayan a asistir')
        expect(menu).toBeInTheDocument()
        const textareas = screen.getAllByRole('textbox')
        expect(textareas).toHaveLength(2)
        expect(textareas[0]).toHaveAttribute('name', 'songlist')
        expect(textareas[1]).toHaveAttribute('name', 'comment')
        const mandatory = screen.getByText('* El campo menú es obligatorio')
        expect(mandatory).toBeInTheDocument()
        const credit = screen.queryByText('Toy icons created by Creaticca Creative Agency - Flaticon')
        expect(credit).not.toBeInTheDocument()
        response.mockClear()
    })
    test('return error 410 when user is not found', async () => {
        jest.spyOn(attendantsService, "getAttendantGroup").mockResolvedValueOnce(new ApiError(410))
        render(
            <BrowserRouter>
                <WeddingForm />
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(mockedNavigate).toBeCalledTimes(1)
        })
        expect(mockedNavigate).toBeCalledWith("/notFound")
    })
})