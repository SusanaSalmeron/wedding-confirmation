import { render, screen, waitFor } from "@testing-library/react"
import Home from "./home"
import { BrowserRouter } from "react-router-dom"
import { ApiError, ApiResponse } from "../../services/attendants"

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
    window.matchMedia = window.matchMedia || function () {
        return {
            matches: false,
            addListener: function () { },
            removeListener: function () { }
        };
    };
    test("shows home correctly", async () => {
        jest.spyOn(attendantsService, "getAttendantGroup").mockResolvedValueOnce(new ApiResponse(
            200, { id: "3", group: "Minimou y Cia", people: ["Minimou", "Truscu"], size: 2, available: true }
        ))

        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>

        )
        const buttons = screen.getAllByRole("button")
        expect(buttons).toHaveLength(2)
        expect(buttons[0]).toHaveTextContent("Vamos a asistir")
        expect(buttons[1]).toHaveTextContent("No asistiremos")
        expect(mockedUseNavigate).not.toBeCalledTimes(1)
    })

    test("useNavigate redirects to /message when id has been complete form previously", async () => {
        jest.spyOn(attendantsService, "getAttendantGroup").mockResolvedValueOnce(new ApiError(410))
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(mockedUseNavigate).toBeCalledTimes(1)
        })
        expect(mockedUseNavigate).toBeCalledWith("/message")
    })
    test("useNavigate redirects to /notFound when id does not exists", async () => {
        jest.spyOn(attendantsService, "getAttendantGroup").mockResolvedValueOnce(new ApiError(404))
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(mockedUseNavigate).toBeCalledTimes(1)
        })
        expect(mockedUseNavigate).toBeCalledWith("/notFound")
    })
})

