import { useTranslation as useTranslationHook } from "react-i18next";

export const useTranslation = () => {
    const { t, i18n } = useTranslationHook();
    
    const getCurrentLocale = () => {
        return i18n.language ? i18n.language.split("-")[0] : 'en';
    };
    const changeLanguage = (locale) => {
        i18n.changeLanguage(locale);
    };
    return {
        t,
        getCurrentLocale,
        changeLanguage
    };
};