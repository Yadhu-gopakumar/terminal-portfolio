
import InteractiveIDCard from "./interactiveCard";

export const Card = () => {
    return (
        <div className="h-[60vh] w-full lg:h-full lg:w-[35%] flex flex-col items-center justify-between relative border border-green-500 bg-gradient-to-br from-stone-700 to-black">
            <InteractiveIDCard />

            <p className="absolute bottom-3 right-4 text-green-500 text-sm w-full flex items-center justify-end">
                [Interacive 3D Card]
            </p>
        </div>
    );
}
