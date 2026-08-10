import { create_ancestor_array } from "./array_generator.js";
import { bubblesort } from "./bubblesort.js";
import { playAnimation } from "./animate.js";
import { quicksort } from "./quicksort.js";
import { selectionsort } from "./selectionsort.js";
import { insertionsort } from "./insertionsort.js";

const algorithms = [bubblesort, quicksort, selectionsort, insertionsort];
let max;
const state = {
    isRunning: false,
    isCanceled: false,
    isPaused: false,
};


function init() {
    const initial_arr = create_ancestor_array();
    setupData(initial_arr);
    createBarCharts();
}

function setupData(dataObj) {
    rename_startButton("Start");
    max = dataObj.max;
    for (const algorithm of algorithms) {
        algorithm.array = [...dataObj.arr];
        algorithm.animation = algorithm.fn(algorithm.array);
    }

    document.querySelector("#speed_slider").value = document.querySelector("#speed_slider").attributes.value.textContent;
}

function main(){
    for (const algorithm of algorithms){
        createBarChart(algorithm);
    }

    startAnimation();
    
}

function createBarCharts(){
    const main_container = document.querySelector(".main_container");
    while(main_container.firstChild){
        main_container.removeChild(main_container.firstChild);
    }
    for (const algorithm of algorithms){
        createBarChart(algorithm);
    }
}

async function startAnimation(){
    if (state.isRunning) return;
    state.isRunning = true;
    rename_startButton("Pause");

    let animationPromises = [];
    for(const algorithm of algorithms){
        animationPromises.push(playAnimation(algorithm, state));
    }

    await Promise.all(animationPromises);

    state.isRunning = false;
    rename_startButton("Start");
}

function rename_startButton(text){
    document.querySelector("#btn_start").textContent = text;
}

function createBarChart(algorithm){
    let sort_container = document.createElement('div');
    sort_container.className = 'algorithm_container';
    sort_container.id = algorithm.container;

    let h_text = document.createElement("h3");
    h_text.textContent = algorithm.name;
    sort_container.append(h_text);

    let chart_container = document.createElement('div');
    chart_container.className = "chart_container";

    for(const num of algorithm.array){
        let num_container = document.createElement('div');
        num_container.className = "bar";
        num_container.style.height = `${num / max * 100}%`;
        chart_container.append(num_container);
    }
    sort_container.append(chart_container);

    let stats_container = document.createElement("div");
    stats_container.className = "stats_container";
    stats_container.innerHTML = `
        <div class="stat_card">
            <span class="stat_label">Comparisons</span>
            <strong class="stat_compare">0</strong>
        </div>
        <div class="stat_card">
            <span class="stat_label">Swaps</span>
            <strong class="stat_swap">0</strong>
        </div>
        <div class="stat_card">
            <span class="stat_label">Time</span>
            <strong class="stat_time">0 ms</strong>
        </div> 
    `;

    sort_container.append(stats_container);
    document.querySelector('.main_container').append(sort_container);
}


createBarCharts();

document.getElementById("btn_start").onclick = () => {
    if(!state.isRunning){
        startAnimation();
    }
    else{
        state.isPaused = !state.isPaused;
        rename_startButton(state.isPaused ? "Continue" : "Pause");
    }
};

document.getElementById("btn_generate").onclick = () => {
    if(state.isRunning) {
        state.isCanceled = true;
        state.isRunning = false;
    }

    const new_arr = create_ancestor_array();
    setupData(new_arr);

    createBarCharts();
    state.isCanceled = false;
};

init();

