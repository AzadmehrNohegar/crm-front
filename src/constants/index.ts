export const MOBILE_FORMAT = new RegExp(
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
);

export const RE_DIGIT = new RegExp(/^\d+$/);

export const PASSWORD_FORMAT_LEVEL_1 = new RegExp(/[a-zA-Z0-9]{8,}/);

export const PASSWORD_FORMAT_LEVEL_2 = new RegExp(/^(?=.*[a-z])(?=.*[A-Z]).+$/);

export const PASSWORD_FORMAT_LEVEL_3 = new RegExp(/^(?=.*\w)(?=.*\d).+$/);
