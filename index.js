document.addEventListener("DOMContentLoaded", () => {
    let input1 = document.querySelector("#input");
    let input2A = document.querySelector("#input2A");
    let input2B = document.querySelector("#input2B");
    let input3 = document.querySelector("#input3");
    let button1 = document.querySelector("#button");
    let button2 = document.querySelector("#button2");
    let button3Peek = document.querySelector("#peekButton");
    let button3Enqueue = document.querySelector("#enqueueButton");
    let button3Dequeue = document.querySelector("#dequeueButton")
    let resultPTag1 = document.querySelector("#resultPTag1");
    let resultPTag2 = document.querySelector("#resultPTag2");
    let resultPTag3 = document.querySelector("#resultPTag3");
    console.log("DOM loaded");

    button1.addEventListener("click", () => {
        console.log("input.value", input1.value)
        let inputValue = input1.value + ""
        let mainURL = "http://localhost:4001/animal";
        let finalURL = `${mainURL}/${inputValue}`;
        fetchAnimalData(finalURL);
    })

    button2.addEventListener("click", () => {
        let input2AValue = input2A.value;
        let input2BValue = input2B.value;
        let finalURL = `http://localhost:4001/random?floor=${input2AValue}&ceil=${input2BValue}`;
        fetchRandomNumber(finalURL);
    })

    button3Peek.addEventListener("click", () => {
        let finalURL = `http://localhost:4001/queue/peek`;
        fetchPeek(finalURL);
    })

    button3Enqueue.addEventListener("click", () => {
        let input3Value = input3.value;
        let finalURL = `http://localhost:4001/queue/enqueue?name=${input3Value}`;
        fetchEnqueue(finalURL);
    })

    button3Dequeue.addEventListener("click", () => {
        let input3Value = input3.value;
        let finalURL = `http://localhost:4001/queue/dequeue`;
        fetchDequeue(finalURL);
    })

    const fetchAnimalData = async (finalURL) => {
        console.log("fetchData started");
        let response = await axios.get(finalURL)
        .catch(error => {
            console.log('error:', error);
        })
        console.log(response.data);
        if(response.data.message === true) {
            resultPTag1.innerText = "The animal is already in the database";
        } else {
            resultPTag1.innerText = "The animal has been added to the database";
        }
        return response;
    }

    const fetchRandomNumber = async (finalURL) => {
        console.log("fetchRandomNumber started");
        let response = await axios.get(finalURL)
        .catch(error => {
            console.log("error:", error);
        })
        console.log(response.data);
        if(response.data.status === "success") {
            resultPTag2.innerText = `Random pick: ${response.data.randPick}`;
        } else {
            resultPTag2.innerText = "Invalid inputs";
        }
        return response;
    }

    const fetchPeek = async (finalURL) => {
        console.log("fetchPeek started");
        let response = await axios.get(finalURL)
        .catch(error => {
            console.log("error", error);
        })
        resultPTag3.innerText = `Peek of the queue is: ${response.data.data}`;
        return response;
    }

    const fetchEnqueue = async (finalURL) => {
        console.log("fetchEnqueue started");
        let response = await axios.get(finalURL)
        .catch(error => {
            console.log("error", error);
        })
        console.log(response.data);
        resultPTag3.innerText = `Name enqueued was: ${response.data.enqueued}`;
        return response;
    }

    const fetchDequeue = async (finalURL) => {
        console.log("fetchDequeue started");
        let response = await axios.get(finalURL)
        .catch(error => {
            console.log("error", error);
        })
        console.log(response.data);
        resultPTag3.innerText = `Name dequeued is: ${response.data.dequeued}`;
        return response;
    }
})