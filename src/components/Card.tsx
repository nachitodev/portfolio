import type { ReactNode, CSSProperties, ElementType } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    as?: ElementType;
    interactive?: boolean;
}

export default function Card({
    children,
    className = '',
    style,
    as: Component = 'div',
    interactive = false,
}: CardProps) {
    const baseClass = interactive ? 'card-project' : 'panel';
    return (
        <Component className={`${baseClass} ${className}`.trim()} style={style}>
            {children}
        </Component>
    );
}
