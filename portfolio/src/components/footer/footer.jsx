import { useState, useEffect } from "react";



export const Footer = () => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date().toLocaleTimeString());
 
    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);


    }, [])

    return (
        <div className="flex flex-row items-center justify-between w-full px-2 border-t border-green-500 py-2">
            <div className="text-sm text-green-500">yadhu@portfolio:~$</div>
            <p className="text-sm text-green-500  tracking-wider mt-1">{date.toLocaleDateString()} {time}</p>
        </div>
    );
}