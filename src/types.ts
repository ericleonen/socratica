export type LayoutProps = {
    children: React.ReactNode
}

export type Paragraph = {
    start: number,
    end: number,
    content: string
}

/**
 * Parameterless void-valued function
 */
export type Trigger = () => void;