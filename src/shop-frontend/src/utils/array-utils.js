/**
 * Created by roman_b on 2/6/2017.
 */
export const getItemById = function(list, id){
    if (list == null)
        return null;
    return list.find(item => item._id == id);
}

export const getItemIndex = function(list, id){
    let item = getItemById(list, id);
    return list.indexOf(item);
}

export const pushUnique = (list, item) => {
    const index = list.indexOf(item);
    if (index == -1){
        list.push(item);
    }
    return list;
}