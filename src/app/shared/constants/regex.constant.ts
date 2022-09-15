/**
 * regex.constant.ts
 *
 * This file contains all the regular expressions that the application
 * uses.
 */

/**
 *  The Regex object
 */
export const RegularExpressions = {
    HEX_COLOR_CODE: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    LOGIN_EMAIL: /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,20})+)$/,
    DATE_MM_DD_YY: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/,
    PHONE: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
    SSN: /^\d{3}-\d{2}-\d{4}$/
};
