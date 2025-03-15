import { useState, useEffect } from "react";

const Loading = () => {
    const targetText = "Loading...";
    const [scrambledText, setScrambledText] = useState(targetText);
    const characters = "!@#$%^&*?+#@@$&@*$@$!^&#%";

    useEffect(() => {
        let timeout;
        let iteration = 0;

        const scramble = () => {
            setScrambledText((prev) =>
                prev
                    .split("")
                    .map((char, index) =>
                        Math.random() > iteration / targetText.length
                            ? characters[Math.floor(Math.random() * characters.length)]
                            : targetText[index]
                    )
                    .join("")
            );

            iteration++;
            if (iteration <= targetText.length) {
                timeout = setTimeout(scramble, 100);
            } else {
                setTimeout(() => {
                    iteration = 0;
                    scramble();
                }, 1000);
            }
        };

        scramble();
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="flex text-black justify-center items-center h-screen font-lexend bg-[#D8D8D8] text-4xl">
            {scrambledText}
        </div>
    );
};

export default Loading;