const usePersianConvert = () => {
  const convertPersian2English = (string: string) => {
    if (string.length === 0) return "";
    return string.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, (c: string) => {
      return (c.charCodeAt(0) & 0xf).toString();
    });
  };
  return { convertPersian2English };
};

export { usePersianConvert };
