"use client"
export default function Button({ text, onClick, className }) {
    return (
        <button
            className={`rounded-lg ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}