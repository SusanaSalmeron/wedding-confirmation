import { render, screen } from "@testing-library/react"
import Info from "./info"
import { BrowserRouter } from "react-router-dom"


describe("<Info/>", () => {
    test("shows info successfully", async () => {
        render(
            <BrowserRouter>
                <Info />
            </BrowserRouter>
        )
        const titles = screen.getAllByRole("heading")
        expect(titles).toHaveLength(5)
        expect(titles[0]).toHaveTextContent("AVISO")
        expect(titles[1]).toHaveTextContent("Una vez tengamos confirmación de asistencia y si habéis solicitado habitación, se os comunicará el hotel que se os haya asignado")
        expect(titles[2]).toHaveTextContent("¿Dónde es la ceremonia?")
        expect(titles[3]).toHaveTextContent("¿Dónde es la celebración?")
        expect(titles[4]).toHaveTextContent("¿Dónde es el brunch?")
        const link = screen.getAllByRole("link")
        expect(link).toHaveLength(3)
        expect(link[0]).toHaveAttribute("href", "https://goo.gl/maps/hXDQEvHWxbApMznZ9")
        expect(link[1]).toHaveAttribute("href", "https://goo.gl/maps/XzRt4juv7WYLZK266")
        expect(link[2]).toHaveAttribute("href", "https://goo.gl/maps/x84BcTSSLNUoiuGU6")
    })
})