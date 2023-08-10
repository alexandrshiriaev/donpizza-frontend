export const blockScroll = () => {
    const body = document.querySelector('body');

    if (body) {
        body.style['overflow'] = 'hidden';
    }
};

export const unblockScroll = () => {
    const body = document.querySelector('body');

    if (body) {
        body.style['overflow'] = 'auto';
    }
};

export const getScrollWindow = () => {
    return window.scrollY;
};
