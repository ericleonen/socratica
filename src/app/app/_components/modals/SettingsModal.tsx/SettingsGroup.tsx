type SettingsGroupProps = {
    name: string,
    children: React.ReactNode
}

export default function SettingsGroup({ name, children }: SettingsGroupProps) {
    return (
        <div className="flex flex-col px-7 pt-3 pb-6 border-t-2 border-slate-200 dark:border-slate-700">
            <p className="font-bold text-slate-400 dark:text-slate-600 uppercase tracking-wider text-xs">{name}</p>
            {children}
        </div>
    );
}