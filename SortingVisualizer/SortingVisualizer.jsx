//This project was done using a tutorial on youtube
import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';
// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';
export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);   //Takes the props from the parent class

        //Storing our array in our state (This will be our main array)
        this.state = {
            array: [],
        };
    }

    //When this component loads for the first time
    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 425; i++) {
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({ array });  //This reset the state to have the newly generated array
    }

    mergeSort() {
        //Get the animation by calling merge sort on the array
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                //Every 3 values we have a new start of a new animation 
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {  //Set a timeout 
                    //During the timeout change the two animation bars to the color
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }

    }

    quickSort() { }

    heapSort() { }

    bubbleSort() { }

    //This tests all our algorthims (creates 100 arrays and every array will be a random length)
    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
            const array = [];
            const length = randomIntFromInterval(1, 1000);
            for (let i = 0; i < length; i++) {
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
            const mergeSortedArray = getMergeSortAnimations(array.slice());
            console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
        }
    }

    render() {
        const { array } = this.state;
        return (
            <div className="array-container">
                {/* Maps the array values to a div */}
                {array.map((value, idx) => (
                    <div
                        className='array-bar'
                        key={idx}
                        //For the height of the bar use the value from the mapped array (This is pretty much displaying the value as a bar instead of printing it on the screen )
                        style={{ height: `${value}px` }}></div>
                ))}
                {/* Creating a button for generating a new array and buttons to display different sorts*/}
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>

            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    //min and max are included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Function to check if sorting algorithms work will return false if there is a bug returns true if it works
function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) {
            return false;
        }
    }
    return true;
}
