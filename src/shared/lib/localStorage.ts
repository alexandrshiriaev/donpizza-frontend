export const getLocalStorage = (key: string, defaultValue: any) => {
    try {
        const serializedValue = localStorage.getItem(key);
        const value = JSON.parse(serializedValue || '');
        return value;
    } catch (e) {
        return defaultValue;
    }
};

export const setLocalStorage = (key: string, value: any) => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (e) {
        console.log(e);
    }
};
