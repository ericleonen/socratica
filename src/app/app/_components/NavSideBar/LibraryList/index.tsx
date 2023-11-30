import { DocumentMetadataType, getPathDocID, saveDocument, saveDocumentMetadata } from "@/utils/store";
import DocumentItem from "./DocumentItem";
import LibraryButton from "./LibraryButton";
import LineSkeleton from "@/components/skeletons/LineSkeleton";
import { useContext } from "react";
import UserDataContext from "../../UserDataContext";
import CurrTitleContext from "../../CurrTitleContext";
import { usePathname } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";
import CurrDocContext from "../../CurrDocContext";

export default function LibraryList() {
    const { documents } = useContext(UserDataContext);
    const { currTitle } = useContext(CurrTitleContext);
    const [authUser, authLoading, authError] = useAuthState(auth);
    const [[text, setText], [questions, setQuestions]] = useContext(CurrDocContext);

    const docID = getPathDocID(usePathname());

    const forceSave = () => {
        if (!authUser || !docID || !(typeof text === "string") || !questions || !documents) return;

        const userID = authUser.uid;
        saveDocument(userID, docID, { text, questions });
        saveDocumentMetadata(userID, docID, currTitle, documents)
    }

    return (<>
        <LibraryButton />
        <div className="flex flex-col flex-grow w-full">{
            documents ? documents.map(({ title, id }, i) => {
                return !(docID === id) ? (
                    <DocumentItem
                        onClick={forceSave}
                        key={`doc_${i}`}
                        {...{title, id}}
                    />
                ) : (
                    <DocumentItem 
                        key={`doc_${i}`}
                        title={currTitle}
                        id={id}
                        current
                    />
                )
            }) : (
                <div className="flex flex-col pl-3 pr-2">{
                    Array.from(Array(3)).map((_, j) => {
                        return (
                            <LineSkeleton 
                                key={`doc_skeleton_${j}`}
                                dark 
                                className="mt-2 mb-3 text-sm"
                            >
                                    ...
                            </LineSkeleton>
                        )
                    })
}               </div>
            )
        }</div>
    </>);
}