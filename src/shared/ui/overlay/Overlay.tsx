import { useEffect } from 'react';

import { blockScroll, unblockScroll, getScrollWindow } from '~/shared/lib';

import { motion } from 'framer-motion';

export const Overlay = () => {
    useEffect(() => {
        blockScroll();
        return () => {
            unblockScroll();
        };
    }, []);

    return (
        <motion.div
            className="absolute z-20 w-screen h-screen bg-black left-0"
            style={{ top: getScrollWindow() + 'px' }}
            animate={{ opacity: 0.2 }}
            initial={{ opacity: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.4 }}
        ></motion.div>
    );
};
