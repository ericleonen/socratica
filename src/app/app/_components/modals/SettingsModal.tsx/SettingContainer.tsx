type SettingContainerProps = {
    children: React.ReactNode,
    name: string,
    description: string
}

export default function SettingContainer({ children, name, description }: SettingContainerProps) {
    return (
        <div className="flex items-center mt-3 px-3">
            <div className="flex flex-col max-w-64 mr-auto">
                <p>{name}</p>
                <p className="text-xs text-slate-500">{description}</p>
            </div>
            {children}
        </div>
    )
}