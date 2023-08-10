import { useEffect, useRef, useState } from 'react';

import classes from './Switch.module.css';

interface SwitchProps {
    variants: SwitchVariant[];
    onSwitch(variantKey: string): void;
    activeKey: string;
}

type SwitchVariant = {
    key: string;
    value: string;
    isAvailable: boolean;
};

type MutatedSwitchVariant = SwitchVariant & {
    id: number;
};

const mutateVariants = (variants: SwitchVariant[]): MutatedSwitchVariant[] => {
    const mutatedSwitchVariants = [] as MutatedSwitchVariant[];
    for (let i = 0; i < variants.length; i++) {
        const mutatedSwitchObj = {
            id: i,
            key: variants[i]['key'],
            value: variants[i]['value'],
            isAvailable: variants[i]['isAvailable'],
        };
        mutatedSwitchVariants.push(mutatedSwitchObj);
    }
    return mutatedSwitchVariants;
};

const getVariantIdByKey = (
    key: string,
    variants: MutatedSwitchVariant[]
): number => {
    let foundId = -1;
    for (let i = 0; i < variants.length; i++) {
        if (variants[i].key === key) {
            foundId = variants[i].id;
            break;
        }
    }
    return foundId;
};

export const Switch = ({ variants, onSwitch, activeKey }: SwitchProps) => {
    const ref = useRef(null);

    const [mutatedVariants, setMutatedVariants] = useState(
        mutateVariants(variants)
    );

    useEffect(() => {
        setActiveVariant(activeKey);
        setMutatedVariants(mutateVariants(variants));
    }, [activeKey, variants]);

    const setActiveVariant = (activeKey: string) => {
        const switchNode = ref.current;
        if (variants.length > 1 && switchNode !== null) {
            const variantId = getVariantIdByKey(activeKey, mutatedVariants);
            const translateValue = variantId * (100 + 3);
            //@ts-ignore
            const sliderNode = switchNode.children[0];
            sliderNode.style.transform = `translate(${translateValue}%)`;
        }
    };

    useEffect(() => {});

    return (
        <div
            className={'bg-secondary flex rounded-full p-1 relative '}
            ref={ref}
        >
            {variants.length > 1 && (
                <div
                    className={
                        'rounded-full absolute shadow-2xl left-1 top-1 bottom-1 ' +
                        classes['active']
                    }
                    //@ts-ignore
                    style={{
                        width:
                            (100 - variants.length * 2) / variants.length + '%',
                        transition: 'ease-in-out .2s',
                        // boxShadow: '0px 0px 10000px 0px rgba(0, 0, 0, 0.25)',
                    }}
                ></div>
            )}
            {
                //@ts-ignore
                mutatedVariants.map((variant) => {
                    return (
                        <div
                            className="w-full h-full flex hover:cursor-pointer items-center justify-center p-1"
                            onClick={() => {
                                if (variant.isAvailable) {
                                    onSwitch(variant.key);
                                }
                            }}
                            key={variant.key}
                        >
                            <span
                                className={`relative z-10 font-light text-sm ${
                                    !variant.isAvailable ? 'text-neutral' : ''
                                }`}
                            >
                                {variant.value}
                            </span>
                        </div>
                    );
                })
            }
        </div>
    );
};
