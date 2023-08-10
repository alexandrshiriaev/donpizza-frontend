interface MobileCloseButtonProps {
    queryVisibilityClass?: string;
    onClick(): void;
    positioningClass?: string;
}

export const MobileCloseButton = ({
    queryVisibilityClass,
    onClick,
    positioningClass,
}: MobileCloseButtonProps) => {
    return (
        <div
            className={`fixed ${
                positioningClass ? positioningClass : 'top-4 left-4'
            } bg-white rounded-full p-2 cursor-pointer ${
                queryVisibilityClass ? queryVisibilityClass : 'lg:hidden'
            }`}
            style={{
                boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.12)',
            }}
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
            </svg>
        </div>
    );
};
