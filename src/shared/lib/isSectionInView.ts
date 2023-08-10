export const isSectionInView = (sectionId: string): boolean => {
    const element = document.getElementById(sectionId);
    const top = window.scrollY;
    const offset = element?.offsetTop || 0;
    const height = element?.offsetHeight || 0;
    return top >= offset && top < offset + height;
};
