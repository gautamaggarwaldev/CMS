import { createContext, useState, useContext } from "react"

const ContentContext = createContext();

export default function ContentProvider({ children }) {
    const [contents, setContents] = useState([]);

    const addContent = (content) => {
        setContents((prev) => [...prev, { ...content, comments: [] }]);
    }

    const editContent = (updatedContent) => {
        setContents((prev) =>
            prev.map((item) =>
                item.id === updatedContent.id ? { ...updatedContent, comments: item.comments } : item
            )
        );
    }

    const deleteContent = (id) => {
        setContents((prev) => prev.filter((item) => item.id !== id))
    }

    const addComment = (contentId, comment) => {
        setContents((prev) => prev.map((item) => item.id === contentId ? { ...item, comments: [...item.comments, comment] } : item))
    }

    return (
        <ContentContext.Provider value={{contents, addContent, editContent, deleteContent, addComment}}>
            { children }
        </ContentContext.Provider>
    )
}

export const useContent = () => useContext(ContentContext);
