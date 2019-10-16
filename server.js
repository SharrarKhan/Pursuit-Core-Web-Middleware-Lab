const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require ("axios");

const port = 4001;
const app = express();

app.use(bodyParser.urlencoded({
    extender: false
}))
app.use(cors());

let animals = ["owl", "zebra", "tiger", "camel", "lion"];

const isAnimal = (req, res, next) => {
    console.log(req.params.animal);
    let animalInputed = req.params.animal;
    if(animals.includes(animalInputed)) {
        console.log(`${animalInputed} is in the database`);
        res.json({
            status: "success",
            message: true
        })
    } else {
        next();
    }
}
const errorFunc = (req, res, next) => {
    let animalInputed = req.params.animal;
    console.log(`${animalInputed} has been added to the database`);
    res.json({
        status: "failure",
        message: false
    })
}
app.get("/animal/:animal", isAnimal, errorFunc);

/////////////////////////////////////////////////////
const generateSpread = (req, res, next) => {
    console.log("req.query:", req.query);
    let resultArray = [];
    let floor = Number(req.query.floor);
    let ceil = Number(req.query.ceil);
    resultArray.push(floor);
    resultArray.push(ceil);
    console.log("resultArray:", resultArray);
    let numbersInBetween = [];
    for(let i = floor; i < ceil; i++) {
        if(i != floor) {
            numbersInBetween.push(i);
        }
    }
    console.log("numbersInBetween:", numbersInBetween);
    let randomNumber = numbersInBetween[Math.floor(Math.random() * numbersInBetween.length)];
    console.log("randomNumber:", randomNumber);
    console.log(typeof randomNumber)
    if(randomNumber) {
        res.json({
            status: "success",
            range: resultArray,
            randPick: randomNumber
        })
    } else {
        next();
    }
}
const errorFunc2 = (req, res, next) => {
    res.json({
        status: "failure"
    })
}
app.get("/random", generateSpread, errorFunc2);

////////////////////////////////////////////////////////////////
let names = ["elle", "xavier", "michelle", "corey", "reed"];
const peekMethod = (req, res, next) => {
        console.log(names[names.length-1]);
        if(names.length != 0) {
            res.json({
                status: "success",
                data: names[names.length-1]
            })
        } else {
            next();
        }
}
const enqueueMethod = (req, res, next) => {
    let elementToPush = req.query.name;
    if(elementToPush != "") {
        names.unshift(elementToPush);
    } else {
        console.log("Please enter a valid value");
    }
    console.log("current queue of names:", names);
    if(elementToPush != "") {
        res.json({
            status: "success",
            enqueued: elementToPush
        })
    }
}
const dequeueMethod = (req, res, next) => {
    let dequeueElement = names.shift();
    console.log("current queue of names:", names);
    if(dequeueElement) {
        res.json({
            status: "success",
            dequeued: dequeueElement
        })
    } else {
        next();
    }
}
const errorFunc3 = () => {
    res.json({
        status: "failure"
    })
}
app.get(`/queue/peek`, peekMethod, errorFunc3)
app.get(`/queue/enqueue`, enqueueMethod, errorFunc3)
app.get(`/queue/dequeue`, dequeueMethod, errorFunc3)

app.listen(port, () => {
    console.log(`Server is on port ${port}`);
})