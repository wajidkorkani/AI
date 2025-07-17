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
        loading.classList.remove("show")
        send.classList.remove("hide")
        send.classList.add("show")
    }
}

clickHandler()


async function callGoogleAI() {
    const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
    const prompt = document.getElementById("prompt").value;

    const url = "https://generativelanguage.googleapis.com/v1beta/models/text-bison-001:generateText?key=" + apiKey;

    const body = {
    prompt: {
        text: prompt
    },
    temperature: 0.7,
    candidateCount: 1
    };

    const response = await fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
    });

    const data = await response.json();
    document.getElementById("response").innerText =
    data.candidates?.[0]?.output || "No response";
}