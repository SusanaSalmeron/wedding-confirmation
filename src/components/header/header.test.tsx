import { render, screen } from "@testing-library/react"
import Header from "./header"



describe("<Header/>", () => {
    test("shows image correctly", async () => {
        render(
            <Header />
        )

        const image = screen.getByRole("img")
        expect(image).toHaveAttribute("src", "header.png")
    })

})