/**
 * Created by roman_b on 4/18/2017.
 */
export const  buildSearchTemplate = (params, isStrict = false) => {
    let result = params.reduce((prev, current, index) => {
        const prefix = (!isStrict && index > 0) ? '.*|' : '';
        prev += `${prefix}(?=.*${current})`;
        return prev;
    }, '');
    return `^${result}.*$`;
}
