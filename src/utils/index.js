import Cookies from "js-cookie";
export function formathDate(date) {
    if (!date) {
        return '';
    }
    const inputDate = new Date(date);
    const formattedDate = `${inputDate.getHours()}:${inputDate.getMinutes()} ${inputDate.getDate()}/${inputDate.getMonth() + 1}/${inputDate.getFullYear()}`;
    return formattedDate;
}
export function arraysMatch(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    arr1.sort();
    arr2.sort();
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
export function formatPrice(value) {
    if (!value) return 0
    const formattedNumber = value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD' // Định dạng thành tiền USD
    });
    return formattedNumber
}
export function formatPriceVND(value) {
    if (!value && value !== 0) return 0
    const formattedNumber = value.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    return formattedNumber;
}

export function currencyConverter(price, data) {
    let total = price;
    if (data.currency != "USD") {
        total *= data.rate;
    }
    const priceNews = new Intl.NumberFormat(data.from, {
        style: "currency",
        currency: data.currency,
    }).format(total);
    return priceNews
}
export function setCookieAuth({ userId, accessToken, refreshToken, remember }) {
    if (!remember) {
        Cookies.set("userId", userId);
        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", refreshToken);
    } else {
        Cookies.set("userId", userId, { expires: 5 * 24 * 60 * 60 });
        Cookies.set("accessToken", accessToken, { expires: 1800 });
        Cookies.set("refreshToken", refreshToken, { expires: 5 * 24 * 60 * 60 });
    }
}
export function getCookieAuth() {
    const userId = Cookies.get("userId") ?? null;
    const accessToken = Cookies.get("accessToken") ?? '';
    const refreshToken = Cookies.get("refreshToken") ?? '';
    return { userId, accessToken, refreshToken };
}
export function removeCookieAuth() {
    Cookies.remove("userId");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
}
export function getUrlSearchParam(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}
export function setUrlSearchParam(key, value) {
    const currentUrl = new URL(window.location.href);
    const urlParams = new URLSearchParams(currentUrl.search);
    urlParams.set(key, value);
    currentUrl.search = urlParams.toString();
    window.history.pushState({}, '', currentUrl);

}
export function extractNumberFromSlug(slug) {
    const regex = /-(\d+)$/;
    const match = slug.match(regex);
    if (match) {
        return Number(match[1]);
    }
    return null;
}
export async function handlerError(fn, fnError) {
    try {
        await fn();
    } catch (error) {
        console.log(error);
        typeof fnError === "function" && fnError(error);
        alert("Có lỗi xảy ra, vui lòng thử lại sau");
    }
}
export function formatNumber(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
export function generateDataVariant(inputData, priceStockMap, defaultPrice) {
    const attributes = [];

    function generateCombinations(data, currentCombination = []) {
        if (!data || !Array.isArray(data)) {
            throw new Error('Data must be a non-empty array');
        }
        const [currentAttribute, ...remainingAttributes] = data;
        if (!currentAttribute) {
            const code = currentCombination.join("-");
            const price = (priceStockMap.get(code)?.price ?? defaultPrice);
            const stock = (priceStockMap.get(code)?.stock ?? 0);
            const isActive = (priceStockMap.get(code)?.isActive ?? 1);
            attributes.push({ code, price, stock, isActive });
            return;
        }
        for (const value of currentAttribute.value) {
            generateCombinations(remainingAttributes, [...currentCombination, value]);
        }
    }

    generateCombinations(inputData);
    return attributes;
}
export function removeCommas(value) {
    const inputValue = value.replace(/[^0-9]/g, "");
    return inputValue.replace(/,/g, '');
}
// chuyển đổi dữ liệu sang kiểu dữ liệu lưu trữ trên firestore
export function convertToFirestoreData(data) {
    return {
        variant: data.filter((item, index) => {
            if (data.length - 1 > index) {
                return {
                    name: item.name,
                    values: item.values,
                };
            } else {
                return null;
            }
        }),
        productVariants: data[data.length - 1].map((item) => ({
            code: item.code,
            price: item.price.toString(),
            stock: item.stock.toString(),
            isActive: item.isActive,
        })),
    };
}
export const checkSpecs = (spec) => {
    const value = [...spec];
    for (let i = value.length - 1; i >= 0; i--) {
        if (value[i].name === "" && value[i].value === "") {
            value.splice(i, 1);
        } else if (value[i].name === "" || value[i].value === "") {
            return [];
        }
    }
    return value;
};
export function generateDiscountCode(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }

    return code;
}

export function hasCommonElements(arr1, arr2) {
    const set1 = new Set(arr1);

    for (const element of arr2) {
        if (set1.has(Number(element))) {
            return true;
        }
    }
    return false;
}