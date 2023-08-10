import logoPath from './logo.svg';

export const Logo = () => {
    return (
        <div className="flex items-center px-2 md:p-0">
            <img alt="logo img" src={logoPath} />
            <span className="font-logo text-primary text-2xl hidden md:block">
                DonPizza
            </span>
        </div>
    );
};
