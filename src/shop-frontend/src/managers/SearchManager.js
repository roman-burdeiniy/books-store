/**
 * Created by roman_b on 4/19/2017.
 */
export const  buildSearchTemplateWithPosition = (params, isStrict = false, wholeWord = false) => {
    let result = params.reduce((prev, current, index) => {
        const or = !isStrict ? '|': '';
        const prefix = index > 0 ? `.*${or}` : '';
        const boundary = wholeWord ? '\\b' : '';
        prev += `${prefix}${boundary}(${current})${boundary}`;
        return prev;
    }, '');
    return result;
}

export const sortByBestMatch = (items, wordsTmpt) => (getSearchSource) => {
    const result = items.sort((item1, item2) => {
        const tester = new RegExp(buildSearchTemplateWithPosition(wordsTmpt), 'i');
        let matchResult1 = getSearchSource(item1).match(tester);
        let matchResult2 = getSearchSource(item2).match(tester);
        if (matchResult1.index < matchResult2.index){
            return -1
        }else if (matchResult1.index > matchResult2.index){
            return 1;
        }
        return 0;
    })
    return result;
}

export function getSearchableSource(item){
    return `${item.name} ${item.author} ${item.publisher}`;
}