
import { useEffect, useRef, useState } from "react";

export const Terminal = () => {
    // isTyping state to control input and prevent new commands during animation
    const [isTyping, setIsTyping] = useState(false);

    // State for the current command being typed by the user
    const [command, setCommand] = useState("");

    // History of commands and their results, including initial welcome message
    const [history, setHistory] = useState([
        {
            cmd: "welcome",
            res: `Hi, I'm Yadhu Gopakumar, a Fullstack Developer.<br />
Welcome to my interactive portfolio terminal!<br />
Type 'help' to see available commands.`,
        },
    ]);

    // Ref to scroll to the end of the terminal output
    const endRef = useRef(null);

    // Effect to scroll to the bottom whenever history changes
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);


    const nextcmd = async (e) => {
        e.preventDefault();

        // If currently typing, do not process new commands
        if (isTyping) {
            return;
        }

        const currentCommand = command.trim();
        setCommand(""); // Clear input field immediately after capture

        // Handle 'clear' command separately
        if (currentCommand.toLowerCase() === "clear") {
            setHistory([{ cmd: "clear", res: "" }]); // Reset history
            setIsTyping(false); // Ensure typing state is false
            return;
        }

        // Get the result for the entered command
        const result = getCommandResult(currentCommand);

        setHistory((prev) => [...prev, { cmd: currentCommand, res: "" }]);

        // Wait for the typing animation to complete before allowing new commands
        await animateText(result, currentCommand);
    };

  
    const animateText = (text, cmd) => {
        return new Promise((resolve) => {
            let index = 0;
            setIsTyping(true); // Set typing state to true

            const type = () => {
                if (index <= text.length) {
                    const partial = text.slice(0, index);
                    setHistory((prev) => {
                        const updated = [...prev];
                        
                        const lastEntryIndex = updated.length - 1;
                        if (lastEntryIndex >= 0 && updated[lastEntryIndex].cmd === cmd) {
                            updated[lastEntryIndex] = { cmd: cmd, res: partial };
                        }
                        return updated;
                    });
                    index++;
                    // Adjust typing speed here (15ms per character)
                    setTimeout(type, 5);
                } else {
                    setIsTyping(false); // Set typing state to false when animation is done
                    resolve(); 
                }
            };
            type(); // Start the typing animation
        });
    };

    
    const getCommandResult = (cmd) => {
        switch (cmd.toLowerCase()) {
            case "help":
                return "Available commands: help, about, projects, sudo, clear, skills, contact";

            case "about":
                return `Hi, I'm Yadhu Gopakumar, a Fullstack Developer.<br />
Welcome to my interactive portfolio terminal!<br />
<a href="https://drive.google.com/uc?export=download&id=1m1uNViGJSKQr49YNLZHVc3ap6QXu1Gm6" 
   target="_blank" 
   style="color:#4CAF50; text-decoration: underline; font-weight:bold;">
   Download my Resume
</a>
Type 'help' to see available commands.`;

            case "projects":
                return `Canteen Booking System | Flutter & Flask Project<br />
• Developed full-stack mobile application for college canteen management<br />
• Technologies: Flutter, Flask, MySQL, REST API, Razorpay gateway<br />
🔗 <a href="https://github.com/Yadhu-gopakumar/smartq" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">GitHub Repository</a>

Cab Booking System | Django project<br />
• cab booking application with django<br />
• Technologies: django,ajax,Html,css,js, Razorpay gateway<br />
🔗 <a href="https://github.com/Yadhu-gopakumar/cabboooking" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">GitHub Repository</a>

Phishing Detector Chrome extension<br />
• Phishing detector and blocker chrome extension using ML<br />
• Technologies: Scikit-learn (ML Model),Flask (Python Backend),HTML, CSS, JavaScript<br />
🔗 <a href="https://github.com/Yadhu-gopakumar/phishing_detector" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">GitHub Repository</a>
`;

            case "sudo":
                return "Yadhu Gopakumar";

            case "skills":
                return `Technical Skills:<br />
Programming Languages: Python, JavaScript, HTML, CSS, PHP, C, C++, Java<br />
Frameworks: Django, Flask, React.js, Flutter<br />
Databases: MySQL, SQLite<br />
Cloud Platforms: AWS, Azure<br />
Tools: Git, Bootstrap, Postman<br />
Specialized Skills: REST API Development, Full-Stack Web Development, Cloud Operations, Flutter App Development`;

            case "contact":
                return `You can reach me through the following:

📧 Email: <a href="mailto:yadhugopakumar128@gmail.com" target="_blank" class="text-blue-400 underline">yadhugopakumar128@gmail.com</a>
💼 LinkedIn: <a href="https://www.linkedin.com/in/yadhu-gopakumar-40a97520a/" target="_blank" class="text-blue-400 underline">linkedin.com/in/yadhu-gopakumar</a>
💻 GitHub: <a href="https://github.com/Yadhu-gopakumar" target="_blank" class="text-blue-400 underline">github.com/Yadhu-gopakumar</a>
🌐 Portfolio: <a href="https://portfolio-yadhugopakumar.netlify.app/" target="_blank" class="text-blue-400 underline">yadhugopakumar.dev</a>

Feel free to drop a message!
    `;

            default:
                return `Command not found: ${cmd}`;
        }
    };

    return (
        <div className="h-[60vh] w-full lg:h-[80vh] lg:w-[65%] p-2 flex flex-col items-center justify-between overflow-y-auto bg-black-600 rounded-lg shadow-lg font-mono">
            {/* Terminal header bar */}
            <div className="border-b border-green-500 w-full text-green-500 text-sm py-2 px-3 tracking-wider flex justify-between items-center">
                <span>help | about | projects | sudo | clear | skills | contact</span>
                <span className="text-gray-500">Terminal v1.0</span>
            </div>
            {/* Main terminal output area */}
            <div className="flex-1 w-full overflow-y-auto p-3 tracking-wider text-sm space-y-2 text-white custom-scrollbar">
                {history.map((entry, idx) => (
                    <div key={idx}>
                        <div className="flex items-center space-x-2">
                            <p className="text-blue-400">yadhu_gopakumar@portfolio:~$</p>
                            <p className="text-green-500">{entry.cmd}</p>
                        </div>
                        {entry.res && (
                            <div
                                className="text-white mt-1 ml-5 whitespace-pre-line"
                                dangerouslySetInnerHTML={{ __html: entry.res }}
                            />
                        )}
                    </div>
                ))}
                {/* Ref for scrolling to the end */}
                <div ref={endRef}></div>

                <form onSubmit={nextcmd} className="flex items-center space-x-2">
                    <p className="text-blue-400">yadhu_gopakumar@portfolio:~$</p>
                    <input
                        type="text"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        className="bg-transparent border-none outline-none text-green-500 placeholder-gray-500 w-full focus:ring-0"
                        placeholder={isTyping ? "" : "Type command..."}
                        autoFocus // Automatically focus the input field
                        disabled={isTyping} // Disable input while typing animation is active
                    />
                </form>
            </div>


            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #333;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #4a4a4a;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            `}</style>
        </div>
    );
};
