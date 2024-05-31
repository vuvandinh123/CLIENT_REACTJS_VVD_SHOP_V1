import { useEffect } from "react";

export default function useTitle(title) {
    useEffect(() => {
        window.document.title = title || "Shoppe - Mua sắm online";
    },[title])
}