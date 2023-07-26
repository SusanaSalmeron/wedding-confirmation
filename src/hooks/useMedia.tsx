import { useEffect, useState } from "react";


export function useMedia(query: string) {
    const [isDesktop, setIsDesktop] = useState(false);
    function a(query: string) {
        const media = window.matchMedia(query);
        const listener = () => setIsDesktop(media.matches);
        listener();
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }
    useEffect(() => {
        return a(query)
    }, [isDesktop, query]);
    return isDesktop;
};