const arr_obj = create_ancestor_array();
const array = arr_obj.arr;
const max_value = arr_obj.max;

let bubble_sort_obj = {
    fn: () => {},
    finished: false,
    arr: array,
    animation: bubble_sort([...array]),
    name: "Bubble Sort",
    container: "bubbleSortContainer",
};

let algorithms = [bubble_sort_obj];

for (const algorithm of algorithms){
    let sort_container = document.createElement('div');
    sort_container.className = 'algorithm_container';
    sort_container.id = algorithm.container;
    let h_text = document.createElement("h3");
    h_text.textContent = algorithm.name;
    sort_container.append(h_text);
    let chart_container = document.createElement('div');
    chart_container.className = "chart_container";
    for(const num of arr_obj.arr){
        let num_container = document.createElement('div');
        num_container.className = "bar";
        num_container.style.height = `${num / max_value * 100}%`;
        chart_container.append(num_container);
    }
    sort_container.append(chart_container);

    document.querySelector('.main_container').append(sort_container);

    playAnimation(algorithm);
}





function create_ancestor_array(){
    const array = Array.from({length: 50}, () => Math.floor(Math.random() * 50) + 1);
    const max_value = Math.max(...array);

    return {arr: array, max: max_value};
}

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

async function playAnimation(algorithm){
    let queue = algorithm.animation;
    const container = document.querySelector("#" + algorithm.container);
    const bars = container.querySelectorAll(".bar");

    for (const event of queue){
        bars.forEach((bar) => {
        
            bar.classList.remove("comparing");
            bar.classList.remove("swapping");
        });

        let indices;

        switch(event.type){
            case "COMPARE":
                indices = event.indices;
                bars[indices[0]].classList.add("comparing");
                bars[indices[1]].classList.add("comparing");
                break;
            case "SWAP":
                indices = event.indices;
                bars[indices[0]].classList.add("swapping");
                bars[indices[1]].classList.add("swapping");

                let height_help = bars[indices[0]].style.height;
                bars[indices[0]].style.height = bars[indices[1]].style.height;
                bars[indices[1]].style.height = height_help;
                break;

            case "SORTED":
                bars[event.index].classList.add("sorted");
                break;
        }

        await sleep(100);
    }

}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}