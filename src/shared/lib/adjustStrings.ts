export const adjustStrings = (
    strings: string[],
    firstCapital: boolean
): string => {
    let newString: string = '';
    if (!strings.length) return newString;
    strings.forEach((str) => {
        if (newString.length) {
            newString += ', ' + str;
        } else {
            newString = str;
        }
    });
    if (firstCapital) {
        newString = newString[0].toUpperCase() + newString.substring(1);
    }
    return newString;
};
