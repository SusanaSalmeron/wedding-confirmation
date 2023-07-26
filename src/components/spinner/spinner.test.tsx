import { render, screen } from "@testing-library/react"
import Spinner from "./spinner"


describe("<Spinner/>", () => {
    test("shows correctly", async () => {
        render(
            <Spinner />
        )
        const spinner = screen.getByTestId("spinner")
        expect(spinner).toBeInTheDocument()
    })
})