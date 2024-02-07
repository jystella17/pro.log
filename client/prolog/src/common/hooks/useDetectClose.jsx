import { useState, useEffect } from "react";

// 드롭다운 클릭 혹은 드롭다운 외 구역 클릭 시 드롭다운 안보이게
function useDetectClose(ref, initialState) {
    const [isOpen, setIsOpen] = useState(initialState)
    
    useEffect(() => {
        function pageClickEvent(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(!isOpen)
            }
        }

        if (isOpen) {
            window.addEventListener('click', pageClickEvent)
        }

        return () => {
            window.removeEventListener('click', pageClickEvent)
        }
    }, [ref])

    return [isOpen, setIsOpen]
}

export default useDetectClose