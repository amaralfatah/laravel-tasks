import { useId } from 'react';
import type { SVGAttributes } from 'react';

// Sararia mark: a tied sapu lidi drawn as a triangle. Uses currentColor so
// callers tint it with a text-* class.
export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    const maskId = useId();

    return (
        <svg
            {...props}
            viewBox="13.78 16.5 72.44 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <mask id={maskId}>
                    <rect width="100" height="100" fill="#fff" />
                    <rect y="30.9" width="100" height="1.5" />
                    <rect y="37.6" width="100" height="1.5" />
                    <g stroke="#000" strokeWidth="1.7">
                        <path d="M42.69 39.1L27.48 83" />
                        <path d="M47.56 39.1L42.49 83" />
                        <path d="M52.44 39.1L57.51 83" />
                        <path d="M57.31 39.1L72.52 83" />
                    </g>
                </mask>
            </defs>
            <path
                d="M50 18L85.22 79H14.78Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
                mask={`url(#${maskId})`}
            />
            <rect
                x="36.99"
                y="32.4"
                width="26.03"
                height="5.2"
                rx="2.6"
                fill="currentColor"
            />
        </svg>
    );
}
