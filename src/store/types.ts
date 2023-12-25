/**
 * The loading status of a resource
 */
export type ResourceStatus = "idle" | "loading" | "succeeded" | "failed";

/**
 * The saving status of a resource
 */
export type SavingStatus = "deleting" | "saving" | "saved" | "failed";

/**
 * The life stages of an individual question
 */
export type QuestionStatus = "loading" | "ready" | "deleting"