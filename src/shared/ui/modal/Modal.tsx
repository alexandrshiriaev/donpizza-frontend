import React from 'react';
import { CloseButton, MobileCloseButton } from '~/shared/ui';

import { Overlay } from '~/shared/ui';

import { motion } from 'framer-motion';

interface ModalProps {
    leftSide: React.ReactNode;
    rightSide: React.ReactNode;
    onClose: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export const Modal = ({
    leftSide,
    rightSide,
    onClose,
    className,
    style,
}: ModalProps) => {
    return (
        <>
            <Overlay />
            <div className="fixed w-full h-screen top-0 left-0 lg:flex lg:justify-center lg:items-center z-30 overflow-y-auto">
                <div className="relative">
                    <motion.div
                        className={`bg-white min-h-screen lg:min-h-min lg:rounded-2xl grid items-center grid-cols-1 lg:grid-cols-none ${
                            className || ''
                        }`}
                        style={style}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: 'easeInOut', duration: 0.2 }}
                    >
                        {leftSide}
                        {rightSide}
                    </motion.div>
                    <div className="absolute top-0 -right-12 hidden lg:block ">
                        <CloseButton onClick={onClose} />
                    </div>
                    <MobileCloseButton onClick={onClose} />
                </div>
            </div>
        </>
    );
};
