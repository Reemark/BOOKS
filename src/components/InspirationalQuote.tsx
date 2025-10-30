import React, { useState, useEffect } from 'react';
import './InspirationalQuote.css';

const messages = [
    "La lecture est une porte ouverte sur un monde enchanté.",
    "Un livre est un rêve que vous tenez dans vos mains.",
    "Lisez, rêvez, évadez-vous.",
    "Nourrissez votre esprit, lisez un livre."
];

const InspirationalQuote = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState(messages[0]);

    useEffect(() => {
        const showQuote = () => {
            const randomIndex = Math.floor(Math.random() * messages.length);
            setMessage(messages[randomIndex]);
            setIsVisible(true);

            setTimeout(() => {
                setIsVisible(false);
            }, 4000); // Quote is visible for 4 seconds
        };

        const interval = setInterval(showQuote, 15000); // Show a quote every 15 seconds

        // Show the first quote after a delay
        const initialTimeout = setTimeout(showQuote, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(initialTimeout);
        };
    }, []);

    return (
        <div className={`inspirational-quote-overlay ${isVisible ? 'visible' : ''}`}>
            <p className="quote-text">{message}</p>
        </div>
    );
};

export default InspirationalQuote;