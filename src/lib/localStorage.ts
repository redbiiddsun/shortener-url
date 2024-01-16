import { Url } from "@prisma/client";

export const accessLocalStorage = () => {
    let resultStorage: Url[] = JSON.parse(
        localStorage.getItem("shortener-data") || "[]"
    );

    return resultStorage;
};

export const storeLocalStorage = (data: Url | null) => {
    let urlHistory = accessLocalStorage();

    if (data != null) {
        urlHistory.push(data);
    }

    localStorage.setItem("shortener-data", JSON.stringify(urlHistory));
};

export const removeLocalStorage = () =>
    localStorage.removeItem("shortener-data");
