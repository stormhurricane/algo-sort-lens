import { array } from "./array_generator.js";

export const quicksort = {
    animation: quick_sort([...array], 0, array.length - 1),
    name: "Quick Sort",
    container: "quickSortContainer",
};

function partition(array, queue, start, end){
    let pivot_value = array[end];
    let left = start
    let right = end -1;
    while (left <= right){
        while(left <= right && array[left] < pivot_value){
            queue.push({ type: "COMPARE", indices: [left, end]});
            left++;
        }

        while (right >= left && array[right] > pivot_value){
            queue.push({ type: "COMPARE", indices: [right, end]});
            right --;
        }

        if (left < right) {
            let help_val = array[left];
            array[left] = array[right];
            array[right] = help_val;

            queue.push({ type: "SWAP", indices: [left, right] });

            left++;
            right--;
        } else if (left === right) {
            left++;
        }
    }

    if(left > end){
        left = end;
    }


    array[end] = array[left];
    array[left] = pivot_value;
    queue.push({type: "SWAP", indices: [left, end]});
    queue.push({type: "SORTED", index: left});

    return left;
}

function quick_sort(array, start, end, queue = []){
    if(start == end) {
        queue.push({ type: "SORTED", index: start });
        return queue;
    }
    if(start > end){
        return queue;
    }

    let pivot_index = partition(array, queue, start, end);

    quick_sort(array, start, pivot_index -1, queue);
    quick_sort(array, pivot_index +1, end, queue);
   

    return queue;
}

