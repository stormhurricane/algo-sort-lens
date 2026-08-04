import { array, max_value } from "./array_generator.js";
import { bubblesort } from "./bubblesort.js";
import { playAnimation } from "./animate.js";
import { quicksort } from "./quicksort.js";
import { selectionsort } from "./selectionsort.js";
import { insertionsort } from "./insertionsort.js";

async function main(){
    let algorithms = [bubblesort, quicksort, selectionsort, insertionsort];
    for (const algorithm of algorithms){
        createBarChart(algorithm);
    }

    let animationPromises = [];
    for(const algorithm of algorithms){
        animationPromises.push(playAnimation(algorithm));
    }

    await Promise.all(animationPromises);
    console.log("DONE");
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
    for(const num of array){
        let num_container = document.createElement('div');
        num_container.className = "bar";
        num_container.style.height = `${num / max_value * 100}%`;
        chart_container.append(num_container);
    }
    sort_container.append(chart_container);

    document.querySelector('.main_container').append(sort_container);
}

await main();




