import React from 'react';

import * as types from '~/shared/api/models';

interface ProductProps {
    name: string;
    description?: string;
    footer: React.ReactNode | string;
    tag?: types.Tag;
    header: React.ReactNode | string;
}

export const Product = ({
    header,
    name,
    description,
    footer,
    tag,
}: ProductProps) => {
    return (
        <div className="bg-white rounded-2xl relative overflow-hidden">
            {tag && (
                <div
                    className="absolute top-0 left-0 px-6 py-1.5 font-bold"
                    style={{
                        background: tag.bgColor,
                        color: tag.textColor,
                        borderRadius: '0 0 16px 0',
                    }}
                >
                    {tag.value}
                </div>
            )}

            <header className="flex justify-center px-12 py-6">{header}</header>
            <section className="px-8">
                <h3 className="text-2xl font-header">{name}</h3>
                {<p className="wrap text-neutral mt-2">{description || ''}</p>}
            </section>
            <footer className="flex justify-between items-center px-8 my-8">
                {footer}
            </footer>
        </div>
    );
};
