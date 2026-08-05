export function create_ancestor_array(){
    const array = Array.from({length: 20}, () => Math.floor(Math.random() * 20) + 1);
    const max_value = Math.max(...array);

    return {arr: array, max: max_value};
}
