import type { SVGAttributes } from 'react';

// Sararia Tasks glyph: one plain, heavy tick (see sararia-logo/FAMILY.md and
// tasksGlyph() in sararia-logo/generate-apps.mjs). Uses currentColor so
// callers tint it with a text-* class. Pass `small` when it renders at 32px
// or below: a slightly larger tick with a heavier stroke stays legible.
// The path sets fill="none" explicitly: callers pass fill-current, which
// would otherwise fill the tick's open corner.
export default function AppLogoIcon({
    small = false,
    ...props
}: SVGAttributes<SVGElement> & { small?: boolean }) {
    return (
        <svg
            {...props}
            viewBox={small ? '12 12 77 77' : '14 14 73 73'}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d={
                    small
                        ? 'M21.92 52.16L41.36 71.6L79.16 29.48'
                        : 'M24 52L42 70L77 31'
                }
                fill="none"
                stroke="currentColor"
                strokeWidth={small ? 17 : 14}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
