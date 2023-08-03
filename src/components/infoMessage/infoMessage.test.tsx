import { render, screen } from "@testing-library/react"
import InfoMessage from "./infoMessage"
import { BrowserRouter } from "react-router-dom"


describe("<InfoMessage/>", () => {
    test("shows info correctly when passing props", async () => {
        render(
            <BrowserRouter>
                <InfoMessage message="Mensaje" image="imagen" alt="imagen" link="www.link.es" email="" />
            </BrowserRouter>

        )

        const image = screen.getByRole("img")
        expect(image).toHaveAttribute("src", "imagen")
        const link = screen.getByRole("link")
        expect(link).toHaveAttribute("href", "/www.link.es")
        expect(link).toHaveTextContent("Aqui tienes unos enlaces de interés sobre el evento, puedes consultarlos volviendo a la web cuando quieras")
    })

    test("shows default info when not passing props", async () => {
        render(
            <BrowserRouter>
                <InfoMessage message="Mensaje" image="" alt="imagen" link="" email="" />
            </BrowserRouter>

        )

        const image = screen.getByRole("img")
        expect(image).toHaveAttribute("src", "https://media.giphy.com/media/l2JJKs3I69qfaQleE/giphy.gif")
        const link = screen.queryByRole("link")
        expect(link).not.toBeInTheDocument()
        expect(link).toBeNull()
    })
})