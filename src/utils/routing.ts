import { usePathname } from "next/navigation";

/**
 * Hook that provides the current docID from the path. Obviously, doesn't apply to routes other
 * than /app/library/{docID}
 * @returns a docID string if there is one, or an empty string
 */
export function usePathDocID() {
    const path = usePathname();
    const segments = path.split("/");

    if (path.indexOf("/app/library/") === 0 && segments.length >= 4) {
        return segments[3];
    } else {
        return "";
    }
}