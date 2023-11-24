export const debounce = (func, delay) => {
  let timer;
  return function (...params) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, params);
    }, delay);
  };
};
