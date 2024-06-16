import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { getCookieAuth, setCookieAuth } from "../utils";
import { useNavigate } from "react-router-dom";

export function calculateTimeDifference(targetTimeString) {
  const targetTime = new Date(targetTimeString);
  const currentTime = new Date();
  const timeDifference = currentTime - targetTime;
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const secondsDifference = Math.floor((timeDifference % (1000 * 60)) / 1000);
  return {
    hours: hoursDifference,
    minutes: minutesDifference,
    seconds: secondsDifference
  };
}
export function getLocalStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
}
export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function getSessionStorage(key) {
  return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : null;
}
export function setSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
export const convertDataTimeToLocal = (timestampString) => {
  const timestampDate = new Date(timestampString);
  // Lấy giá trị ngày, giờ và phút từ timestampDate
  const year = timestampDate.getFullYear();
  const month = (`0${timestampDate.getMonth() + 1}`).slice(-2); // Thêm '0' phía trước nếu số tháng có một chữ số
  const day = (`0${timestampDate.getDate()}`).slice(-2); // Thêm '0' phía trước nếu số ngày có một chữ số
  const hour = (`0${timestampDate.getHours()}`).slice(-2); // Thêm '0' phía trước nếu số giờ có một chữ số
  const minute = (`0${timestampDate.getMinutes()}`).slice(-2); // Thêm '0' phía trước nếu số phút có một chữ số

  // Định dạng thành chuỗi đủ dài để sử dụng trong input "datetime-local"
  const formattedDateTime = `${year}-${month}-${day}T${hour}:${minute}`;
  return formattedDateTime;
}
export function buildMenuTree(menuItems, parent_id = 0) {
  let menuTree = [];
  menuItems.forEach((item) => {
    if (item.parent_id === parent_id) {
      const children = buildMenuTree(menuItems, item.id);
      if (children.length) {
        item.children = children;
      }
      menuTree.push(item);
    }
  });
  return menuTree;
}
export function isObjectEmptyOrNull(obj, keysToIgnore = []) {
  if (obj === null || obj === undefined) {
    return true;
  }
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (keysToIgnore.includes(key)) {
        continue;
      }
      if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
        return true;
      }
    }
  }

  return false;
}
export function checkRole(role) {
  const { accessToken } = getCookieAuth();
  try {
    const decodedToken = jwtDecode(accessToken);
    // Lấy thông tin từ token đó
    const roleStr = decodedToken.role;
    // Kiểm tra quyền
    if (roleStr !== role) {
      return 0;
    }
    return 1
  } catch (error) {
    return 0
  }

}