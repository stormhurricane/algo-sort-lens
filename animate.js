export async function playAnimation(algorithm){
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