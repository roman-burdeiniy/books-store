/**
 * Created by roman_b on 2/6/2017.
 */
export const getItemById = function(list, id){
    if (list == null)
        return null;
    return list.find(item => item._id == id);
}