export type ResourceStatus = "idle" | "loading" | "succeeded" | "failed";

export type UserDocID = {
    userID: string,
    docID: string
};

export type SavingStatus = "deleting" | "unsaved" | "saving" | "saved" | "failed";