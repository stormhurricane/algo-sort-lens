export async function playAnimation(algorithm){
    const startTime = performance.now();

    let queue = algorithm.animation;
    const container = document.querySelector("#" + algorithm.container);
    const bars = container.querySelectorAll(".bar");
    const stat_container = container.querySelector(".stats_container");

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
                let compare_span = stat_container.querySelector(".stat_compare");
                let compares = parseInt(compare_span.textContent);
                compare_span.textContent = ++compares;
                break;
            case "SWAP":
                indices = event.indices;
                bars[indices[0]].classList.add("swapping");
                bars[indices[1]].classList.add("swapping");

                let height_help = bars[indices[0]].style.height;
                bars[indices[0]].style.height = bars[indices[1]].style.height;
                bars[indices[1]].style.height = height_help;
                let swap_span = stat_container.querySelector(".stat_swap");
                let swaps = parseInt(swap_span.textContent);
                swap_span.textContent = ++swaps;
                break;

            case "SORTED":
                bars[event.index].classList.add("sorted");
                break;
        }

        let timestamp = performance.now();
        let time_span = stat_container.querySelector(".stat_time");
        time_span.textContent = formatTime(timestamp - startTime);

        let slider = document.querySelector("#speed_slider");
        let sleep_time = parseInt(slider.attributes.max.textContent) - slider.value;
        
        await sleep(sleep_time);
    }

    const endTime = performance.now();
    let time_span = stat_container.querySelector(".stat_time");
    time_span.textContent = formatTime(endTime - startTime);

}

function formatTime(ms){
    if(ms < 1000){
        return `${Math.round(ms)} ms`;
    }
    else{
        return `${(ms / 1000).toFixed(2)} s`;
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}