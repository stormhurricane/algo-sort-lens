import { array } from "./array_generator.js";

export const bubblesort = {
    animation: bubble_sort([...array]),
    name: "Bubble Sort",
    container: "bubbleSortContainer",
};


function bubble_sort(array){
    let swap = false;
    let queue = [];
    let unsorted_length = array.length;
    do{
        swap = false;
        for(let i = 1; i < unsorted_length; i ++){
            queue.push({type: "COMPARE", indices: [i-1, i]});
            if(array[i-1] > array[i]){
                let swapper = array[i];
                array[i] = array[i-1];
                array[i-1] = swapper;
                queue.push({type: "SWAP", indices: [i-1, i]});
                swap = true;
            }
                // queue.push({type: "SORTED", index: i-1});
        }
        unsorted_length--;
        queue.push({ type: "SORTED", index: unsorted_length });
    }
    while(swap);

    for (let i = 0; i < unsorted_length; i++) {
        queue.push({ type: "SORTED", index: i });
    }

    return queue;
}