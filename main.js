const array = Array.from({length: 50}, () => Math.floor(Math.random() * 50));
const max_value = Math.max(...array);

let bubble_sort = {
    fn: () => {},
    finished: false,
    arr: [...array]
};

if(!bubble_sort.finished){

}

let $sort_container = $('<div>', {id: "bubbleSortContainer", class: "algorithm_container"});
$sort_container.append("<h3>Bubble Sort</h3>");
let $chart_container = $('<div>', {class:"chart_container"});
for(const num of bubble_sort.arr){
    $chart_container.append(`<div class='bar' style='height:${num / max_value * 100}%'></div>`);
}
$sort_container.append($chart_container);

$('.main_container').append($sort_container);