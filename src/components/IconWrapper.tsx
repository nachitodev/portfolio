import type { ReactNode, CSSProperties } from 'react';

interface IconWrapperProps {
    children?: ReactNode;
    iconPath?: string;
    hex?: string;
    size?: number;
    className?: string;
    style?: CSSProperties;
    ariaLabel?: string;
}

export default function IconWrapper({
    children,
    iconPath,
    hex,
    size = 14,
    className = '',
    style,
    ariaLabel,
}: IconWrapperProps) {
    if (iconPath) {
        return (
            <svg
                role="img"
                aria-label={ariaLabel}
                viewBox="0 0 24 24"
                width={size}
                height={size}
                fill={hex ? `#${hex}` : 'currentColor'}
                className={`shrink-0 ${className}`.trim()}
                style={style}
            >
                <path d={iconPath} />
            </svg>
        );
    }

    return (
        <span
            className={`inline-flex items-center justify-center shrink-0 ${className}`.trim()}
            style={{ width: size, height: size, ...style }}
            aria-label={ariaLabel}
        >
            {children}
        </span>
    );
}
