const arr_obj = create_ancestor_array();
export const array = arr_obj.arr;
export const max_value = arr_obj.max;

function create_ancestor_array(){
    const array = Array.from({length: 50}, () => Math.floor(Math.random() * 50) + 1);
    const max_value = Math.max(...array);

    return {arr: array, max: max_value};
}
