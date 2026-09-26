import type { ReactNode, CSSProperties, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md';

interface BaseButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: ReactNode;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export type ButtonProps = BaseButtonProps &
    (
        | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
        | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
    );

export default function Button({
    variant = 'primary',
    size = 'md',
    icon,
    children,
    className = '',
    style,
    ...rest
}: ButtonProps) {
    const variantClass = variant === 'ghost' ? 'btn-ghost' : variant === 'outline' ? 'btn-outline' : '';
    const sizeClass = size === 'sm' ? 'btn-sm' : '';
    const fullClassName = `btn ${variantClass} ${sizeClass} ${className}`.trim();

    if ('href' in rest && rest.href) {
        const { href, target, rel, ...anchorProps } = rest as { href: string; target?: string; rel?: string };
        const safeRel = target === '_blank' && !rel ? 'noreferrer' : rel;
        return (
            <a href={href} target={target} rel={safeRel} className={fullClassName} style={style} {...anchorProps}>
                {icon}
                {children}
            </a>
        );
    }

    return (
        <button
            type="button"
            className={fullClassName}
            style={style}
            {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
            {icon}
            {children}
        </button>
    );
}
