let send = document.querySelector(".send");
let loading = document.querySelector(".loading");

let load = true

function clickHandler() {
    load = !load
    if(load){
        send.classList.add("hide");
        loading.classList.remove("hide");
        loading.classList.add("show");
    }else{
        loading.classList.add("hide");
    }
}

clickHandler()