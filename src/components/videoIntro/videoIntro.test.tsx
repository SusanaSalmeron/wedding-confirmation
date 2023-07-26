import { render, screen } from "@testing-library/react"
import VideoIntro from "./videoIntro"


describe("<VideoIntro/>", () => {
    window.matchMedia = window.matchMedia || function () {
        return {
            matches: false,
            addListener: function () { },
            removeListener: function () { }
        };
    };
    test("shows video successfully", async () => {
        render(
            <VideoIntro />
        )

        const video = screen.getByTestId("video")
        expect(video).toHaveAttribute("src", "https://d2ouuei6amuf81.cloudfront.net/assets/video.mp4")
    })
})