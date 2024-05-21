import { useTranslation } from "./useTranslations";


const formateToDate = (date) => {
    return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "2-digit",
    });
};
export const formatDateTranslated = (date: Date) => {
    const { t } = useTranslation();
    const dd: string = formateToDate(date);
    const [day, month, year] = dd.split(" ");
    const translatedMont = t(month).toUpperCase();
    const newDateTranslated = `${day} ${translatedMont} ${year}`;

    return newDateTranslated;
  };
export const transformIsoDate = (date:string) => {

    const formattedDate = date.split('T')[0];
    return formattedDate
}
  