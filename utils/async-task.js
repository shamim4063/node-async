import async from 'async';
import Counter from '../models/counter.model.js';

const asyncOne = (ref) => {
    return new Promise(resolve => {
        console.log(`Waiting ${ref}-1`);
        setTimeout(() => resolve(`Waiting ${ref}-1`), 100);
    })
}

const asyncTwo = (ref) => {
    return new Promise(resolve => {
        console.log(`Waiting ${ref}-2`);
        setTimeout(() => resolve(`Waiting ${ref}-2`), 100);
    })
}

const asyncLoop = (ref, val) => {
    let arr = [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000];
    let newVal = 111 + val;
    let waites = arr.map(ar => {
        return new Promise(resolve => {
            setTimeout(() => {
                let dt = new Date();
                console.log(`Waited for ${ref}- ${newVal}- ${ar}-${dt}`);
                resolve(`Waited for ${ref}- ${newVal}- ${ar}`)
            }, ar)
        })
    })
    return Promise.all(waites);
}

const asyncEachLoop = async () => {
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (const item of array) {
        let updatedCounter = await updateCounter(item);
        console.log(updatedCounter);
    }
    console.log('Done!');
}

async function updateCounter(count) {
    let counter = await Counter.findOne({ name: "normal_counter" })
    await Counter.update({ name: "normal_counter" }, { $set: { seq: (counter.seq + count) } });
    return Counter.findOne({ name: "normal_counter" });
}


export {
    asyncOne, asyncTwo, asyncLoop, asyncEachLoop
}