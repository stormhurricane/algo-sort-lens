// import { array } from "./array_generator.js";

export const insertionsort = {
    fn: (arr) => insertion_sort([...arr]),
    array: [],
    animation: [],
    name: "Insertion Sort",
    container: "insertionSortContainer",
};

function insertion_sort(array){
    let queue= [];
    for(let i = 1; i < array.length; i++){
        let j = i;
        queue.push({type: "COMPARE", indices: [j -1, j]});
        while (j > 0 && array[j - 1] > array[j]){
            let temp = array[j - 1];
            array[j -1] = array[j];
            array[j] = temp;
            queue.push({type: "SWAP", indices: [j-1, j]});
            j--;
        }
    }

    for(let i = 0; i < array.length; i++){
        queue.push({ type: "SORTED", index: i });
    }
 
    
    return queue;

}