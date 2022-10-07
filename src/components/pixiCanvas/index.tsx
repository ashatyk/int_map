import React from "react";
import {Application} from "pixi.js";

const app = new Application({
    width: 800,
    height: 600,
    backgroundColor: 0x5BBA6F,
});

export const PixiCanvas: React.FunctionComponent = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        // On first render create our application
        const app = new Application({
            width: 800,
            height: 600,
            backgroundColor: 0x5BBA6F,
        });

        // Add app to DOM
        ref.current!.appendChild(app.view);
        // Start the PixiJS app
        app.start();

        return () => {
            // On unload completely destroy the application and all of it's children
            app.destroy(true, true);
        };
    }, []);

    return <div ref={ref} />;
}
