import { Card } from "./cardsection/card";
import { Terminal } from "./terminal/terminal";

export const Content = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center w-full h-full  ">
            <Card />
            <Terminal />
        </div>
    );
}

