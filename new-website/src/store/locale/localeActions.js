import { LOCALE_CHANGE } from './localeActionTypes';

export const localeChange = (locale) => ({
    type: LOCALE_CHANGE,
    locale,
});
