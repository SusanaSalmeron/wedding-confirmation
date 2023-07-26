import { render, screen } from "@testing-library/react"
import Footer from "./footer"
import { BrowserRouter } from "react-router-dom"


describe("<Footer/>", () => {
    test("shows footer correctly", async () => {
        render(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        )

        const image = screen.getByRole("img")
        expect(image).toHaveAttribute("src", "footer.png")
        const link = screen.getByRole("link")
        expect(link).toHaveProperty("href", "https://github.com/SusanaSalmeron?tab=repositories")
        expect(link).toHaveTextContent("©2023 by Pochi")
    })
})