import { useId } from 'react';
import type { SVGAttributes } from 'react';

// Sararia Tasks glyph: a clipboard whose clip is the family "tie" band, with
// checked rows cut out of the board (see sararia-logo/FAMILY.md). Uses
// currentColor so callers tint it with a text-* class. Pass `small` when it
// renders at 32px or below: one large check with heavier cuts stays legible.
// Mask shapes set fill explicitly: callers pass fill-current, which would
// otherwise be inherited into the mask and stop the cuts from showing.
export default function AppLogoIcon({
    small = false,
    ...props
}: SVGAttributes<SVGElement> & { small?: boolean }) {
    const maskId = useId();

    return (
        <svg
            {...props}
            viewBox="18 15 64 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <mask id={maskId}>
                    <rect width="100" height="100" fill="#fff" />
                    {small ? (
                        <rect
                            x="34.4"
                            y="15.4"
                            width="31.2"
                            height="13.2"
                            rx="6.6"
                            fill="#000"
                        />
                    ) : (
                        <rect
                            x="35.5"
                            y="17.9"
                            width="29"
                            height="8.2"
                            rx="4.1"
                            fill="#000"
                        />
                    )}
                    <g
                        fill="none"
                        stroke="#000"
                        strokeWidth={small ? 4 : 1.7}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {small ? (
                            <path d="M37 53L45 61L63 43" />
                        ) : (
                            [38.5, 52, 65.5].map((y) => (
                                <g key={y}>
                                    <path
                                        d={`M34 ${y}L36.9 ${y + 2.9}L42.6 ${y - 2.9}`}
                                    />
                                    <path d={`M47.5 ${y}H65`} />
                                </g>
                            ))
                        )}
                    </g>
                </mask>
            </defs>
            <path
                d="M28 22H72V78H28Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
                mask={`url(#${maskId})`}
            />
            {small ? (
                <rect
                    x="37"
                    y="18"
                    width="26"
                    height="8"
                    rx="4"
                    fill="currentColor"
                />
            ) : (
                <rect
                    x="37"
                    y="19.4"
                    width="26"
                    height="5.2"
                    rx="2.6"
                    fill="currentColor"
                />
            )}
        </svg>
    );
}
