const arr_obj = create_ancestor_array();
const array = arr_obj.arr;
const max_value = arr_obj.max;

let bubble_sort = {
    fn: () => {},
    finished: false,
    arr: [...array]
};

if(!bubble_sort.finished){

}

let sort_container = document.createElement('div');
sort_container.className = 'algorithm_container';
sort_container.id = "bubbleSortContainer";
let h_text = document.createElement("h3");
h_text.textContent = "Bubble Sort";
sort_container.append(h_text);
let chart_container = document.createElement('div');
chart_container.className = "chart_container";
for(const num of bubble_sort.arr){
    let num_container = document.createElement('div');
    num_container.className = "bar";
    num_container.style.height = `${num / max_value * 100}%`;
    chart_container.append(num_container);
}
sort_container.append(chart_container);

document.querySelector('.main_container').append(sort_container);


function create_ancestor_array(){
    const array = Array.from({length: 50}, () => Math.floor(Math.random() * 50) + 1);
    const max_value = Math.max(...array);

    return {arr: array, max: max_value};
}
