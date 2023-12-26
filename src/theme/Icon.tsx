type IconProps = {
    type: React.ElementType,
    className?: string
}

export default function Icon({ type, className }: IconProps) {
    const ThemeIcon = type;
    return <ThemeIcon stroke={5} type="outline" className={className} />
}