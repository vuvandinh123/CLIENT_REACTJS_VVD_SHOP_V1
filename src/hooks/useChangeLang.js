import { useEffect, useState } from "react";
import i18n from "../language/LanguageSetting";
import { getUrlSearchParam, setUrlSearchParam } from "../utils";

export default function useChangeLang() {
    const [lang, setLang] = useState('en');
    useEffect(() => {
        const value = getUrlSearchParam("lang");
        if (value) {
            setLang(value);
            i18n.changeLanguage(value);
        }
    },[])
    const changeLang = (e) => {
        const value = e.target.value;
        setLang(value);
        i18n.changeLanguage(value);
        setUrlSearchParam("lang", value);
    }
    return [
        lang,
        changeLang
    ]
}