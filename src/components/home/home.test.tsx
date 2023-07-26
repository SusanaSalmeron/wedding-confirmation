import { render, screen } from "@testing-library/react"
import Home from "./home"
import { BrowserRouter } from "react-router-dom"

const mockedUseNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        id: "5"
    }),
    useNavigate: () => mockedUseNavigate
}))

describe("<Home/>", () => {
    const attendantsService = require("../../services/attendants")
    const useMediaMock = require("../../hooks/useMedia")
    test("shows home correctly", async () => {
        jest.spyOn(attendantsService, "getAttendantGroup").mockResolvedValueOnce({ id: "3", group: "Minimou y Cia", people: ["Minimou", "truscu"], size: 2, available: true })
        jest.spyOn(useMediaMock, "useMedia").mockImplementation(() => (false))
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>

        )
        const buttons = screen.getAllByRole("button")
        expect(buttons).toHaveLength(2)
        expect(buttons[0]).toHaveTextContent("Vamos a asistir")
        expect(buttons[1]).toHaveTextContent("No asistiremos")
    })

    /*  test("shows not found error", async () => {
         jest.spyOn(attendantsService, "getAttendantGroup").mockResolvedValueOnce(404)
         render(
             <BrowserRouter>
                 <Home />
             </BrowserRouter>
 
         )
         expect(mockedUseNavigate).toHaveBeenCalledWith("/notFound")
     }) */
})

