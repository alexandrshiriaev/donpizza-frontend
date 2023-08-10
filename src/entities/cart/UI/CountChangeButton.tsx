interface CountChangeButton {
    id: number;
    currentCount: number;
    onIncrease(id: number): void;
    onDecrease(id: number): void;
}
const CountChangeButton = ({
    id,
    currentCount,
    onDecrease,
    onIncrease,
}: CountChangeButton) => {
    return (
        <div
            className="flex items-center justify-between rounded-full bg-secondary p-1"
            style={{ minWidth: '6rem' }}
        >
            <button onClick={() => onDecrease(id)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-neutral"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <span className="font-semibold">{currentCount}</span>
            <button onClick={() => onIncrease(id)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-primary"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
};

export default CountChangeButton;
