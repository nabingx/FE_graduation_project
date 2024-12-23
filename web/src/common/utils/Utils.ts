import React from "react";
// import StorageService from "../service/StorageService";
// import Constants from "../constants/Constants";
class Utils {
    /**
     *
     * @param amount
     * @param currency không bắt buộc
     * @description Format giá trị thành tiền. Ví dụ: 10000 -> 10.000 đ
     */
    public formatCurrency(amount: number, currency?: string): string {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: currency ? currency : 'VND',
            minimumFractionDigits: 0,
        });
        return formatter.format(amount);
    }

    /**
     *
     * @param text
     * @description Slug . Ví dụ: Danh mục sản phẩm -> danh-muc-san-pham
     */
    public convertToSlug(text: string) {
        return text.toString()
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }
}
export const utils = new Utils();
export function checkLength(arr: any[], length?: number) {
    let num = length ?? 0
    let check = false
    if (arr && arr.length > num) {
        check = true
    }
    return check
}
// export const checkPermission = (permissionCode: any) => {
//     let result = false;
//     let listRole: any = StorageService.getArrayFromLS(Constants.ROLE)
//     let dataUser = StorageService.getObjectStore('data-user')
//     if (checkLength(listRole)) {
//         if(permissionCode=== 'permission' && dataUser.super_admin === 1){
//             result = true
//         }else{
//             let listPermission: any = listRole.map((item:any) =>  {return item.name});
//             if (listPermission && listPermission.length > 0) {
//                 if (listPermission.includes(permissionCode)) {
//                     result = true
//                 }
//             }
//         }
//     }
//     return result;
// }

export function checkPhoneNumber(phoneNumber: any) {
    const phoneRegex = /^(0?)(3[2-9]|5[2|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
    return phoneRegex.test(phoneNumber)
}

/**
 *
 * @param event
 * @description Chỉ nhập số regex các ký tự đặc biệt và chữ
 */
export function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    const keyCode = event.which || event.keyCode;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^[0-9.,]+$/.test(keyValue)) {
        return event.preventDefault();
    }
}

export function handleKeyPressSpecialCharacters(event: React.KeyboardEvent<HTMLInputElement>) {
    const keyCode = event.which || event.keyCode;
    const keyValue = String.fromCharCode(keyCode);
    if (/[#%]/.test(keyValue)) {
        return event.preventDefault();
    }
}

export function setCookie(name: string, value: any, days: number) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name: string) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
export function eraseCookie(name: string) {
    setCookie(name, "", -1);
}

export function sliceText(text:string,length:number) {
    const textSlice = text.length > length ? text.slice(0, length) + "..." : text;
    return textSlice;
}

export function numberByDateNow() {
    return Date.now();
}

export const generateRandomCode = (
    length?: number,
    type?: "number" | "text" | "both"
  ) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const both = letters + numbers;
    let result = "";
    if (type === "text") {
      for (let i = 0; i < Number(length); i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        result += letters[randomIndex];
      }
      return result;
    }
  
    if (type === "number") {
      for (let i = 0; i < Number(length); i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        result += numbers[randomIndex];
      }
      return result;
    }
  
    if (type === "both") {
      for (let i = 0; i < Number(length); i++) {
        const randomIndex = Math.floor(Math.random() * both.length);
        result += both[randomIndex];
      }
      return result;
    }
  
  };