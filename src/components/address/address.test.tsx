import { render, screen } from "@testing-library/react";
import Address from "./address";
import { BrowserRouter } from "react-router-dom";

const mockedDataMap = {
    description: "¿Dónde es la ceremonia?",
    link: "https://goo.gl/maps/hXDQEvHWxbApMznZ9",
    address: "Colegiata San Bartolome - 16640 4, C.José Antonio González, 16640 Belmonte, Cuenca",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3075.9701993091335!2d-2.7052341235241943!3d39.56027950731938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd686b8b6f72abad%3A0xfca6e5d30eb1cd99!2sCollegiate%20of%20San%20Bartolom%C3%A9!5e0!3m2!1sen!2ses!4v1688114918638!5m2!1sen!2ses",
    title: "Colegiata San Bartolome"
}


describe("<Adddress />", () => {
    test("sould show a map correctly", async () => {
        render(
            <BrowserRouter>
                <Address description={mockedDataMap.description} link={mockedDataMap.link} address={mockedDataMap.address} map={mockedDataMap.map} title={mockedDataMap.title} />
            </BrowserRouter>
        )
        const h2 = screen.getByRole("heading")
        expect(h2).toHaveAccessibleName("¿Dónde es la ceremonia?")
        const link = screen.getByRole("link")
        expect(link).toHaveProperty("href", "https://goo.gl/maps/hXDQEvHWxbApMznZ9")
        const address = screen.getByText("Colegiata San Bartolome - 16640 4, C.José Antonio González, 16640 Belmonte, Cuenca")
        expect(address).toBeInTheDocument()
        const map = screen.getByTitle("Colegiata San Bartolome")
        expect(map).toHaveAttribute("src", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3075.9701993091335!2d-2.7052341235241943!3d39.56027950731938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd686b8b6f72abad%3A0xfca6e5d30eb1cd99!2sCollegiate%20of%20San%20Bartolom%C3%A9!5e0!3m2!1sen!2ses!4v1688114918638!5m2!1sen!2ses")
    });
});