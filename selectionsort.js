import { array } from "./array_generator.js";

export const selectionsort = {
    animation: selection_sort([...array]),
    name: "Selection Sort",
    container: "selectionSortContainer",
};

function selection_sort(array){
    let queue= [];
    for(let i = 0; i < array.length - 1; i++){
        let jMin = i;
        for (let j = i +1; j < array.length; j++){
            if(array[j] < array[jMin]){
                jMin = j;
            }
            queue.push({type: "COMPARE", indices: [j, jMin]});
        }
        if (jMin != i){
            let temp = array[i];
            array[i] = array[jMin];
            array[jMin] = temp;

            queue.push({type: "SWAP", indices: [i, jMin]});
        }
        queue.push({type: "SORTED", index: i});
    }
    queue.push({ type: "SORTED", index: array.length - 1 });
    
    return queue;

}