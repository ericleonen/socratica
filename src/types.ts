export type LayoutProps = {
    children?: React.ReactNode,
    className?: string
}

export type Paragraph = {
    start: number,
    end: number,
    content: string
}

/**
 * Parameterless void-valued function
 */
export type Trigger = () => (void | Promise<void>);

export type QuestionID = {
    sectionIndex: number,
    questionIndex: number
}