import { CURRENCY_CHANGE } from './currencyActionTypes';

export const currencyChange = (currency) => ({
    type: CURRENCY_CHANGE,
    currency,
});
