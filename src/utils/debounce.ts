type ms = number;
export const debounce = (callback: (...args: any) => void, wait: ms) => {
  return (...args: any) => {
    setTimeout(() => {
      callback(...args);
    }, wait);
  };
};
