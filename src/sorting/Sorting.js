import React, { useState, useEffect, useRef } from 'react'

export default function Sorting({ columnsInt, range, canRepeat, sortingType, setcansort, sortType, cansort, startSorting, defaultColour }) {
    const [columns, setcolumns] = useState({})
    const [columnWidth, setcolumnWidth] = useState(20)

    const [columnsList, setColumnsList] = useState([])

    const board = useRef(null)
    useEffect(() => {
        setcansort(false);

        calculateColumnWidth()
        generateColumns()

    }, [])

    useEffect(() => {
        calculateColumnWidth()
        generateColumns()
    }, [columnsInt, range['min'], range['max'], canRepeat])

    useEffect(() => {
        if (cansort) {
            let arr = columnsList;

            // let arr = [5, 6, 23, 1, 99, 2, 8];

            let leftIndex = 0;
            let rightIndex = arr.length - 1;

            switch (sortingType) {
                case "Insertion Sort":
                    insertionSort()
                    break;

                case 'Merge Sort':
                    mergeSort(arr, leftIndex, rightIndex)
                    console.log(arr);

                    break;
                case 'Quicksort':
                    quickSort()
                    break;
                case 'Counting Sort':
                    countingSort()
                    break;

                default:
                    break;
            }
        }
        setcansort(false)

    }, [cansort])

    const calculateColumnWidth = () => {
        // set Width of the columns 
        let chartWidth = Math.floor(board.current.getBoundingClientRect().width)
        let styleWidth = chartWidth / columnsInt;
        setcolumnWidth(Math.floor(styleWidth))
    }

    const generateColumns = () => {
        // console.log('generateColumns')

        // loop throught the number of columns assign a value, then check if it can be repeated
        // if canrepeat is on go generate a number, gothrough the array of already generated numbers and assign a unique numbers

        // declare i outside for optimisation
        let i = 1;
        let list = []
        for (i; i <= columnsInt; i++) {
            // generate random numbers and determine if the values can repeat. 
            let value = Math.floor(Math.random() * (range.max - range.min + 1) + range.min)

            let columnitem = {
                id: i,
                value: value,
                sorted: false,
                sorting: false,
            }
            list.push(columnitem)
        }
        setColumnsList(list)
    }

    const insertionSort = () => {
        let parent = document.getElementsByClassName('chart')[0]

        let arr = columnsList;
        let len = columnsList.length;

        let i, key, j, keyVal;
        for (i = 0; i < len; i++) {

            setTimeout((i, key, j, keyVal, parent) => {
                key = arr[i];
                keyVal = arr[i].value;
                j = i - 1;
                parent.children[j].style.backgroundColor = '#30c930';

                while (j >= 0 && arr[j].value > keyVal) {
                    arr[j + 1] = arr[j];
                    parent.children[j + 1].style.backgroundColor = '#d16328';

                    parent.insertBefore(parent.children[j + 1], parent.children[j])

                    j = j - 1;
                }
                arr[j + 1] = key;
                // setColumnsList(arr);
                // console.log('sorted')
                // parent.children[j + 1].style.backgroundColor = defaultColour;

            }, i * 500, i, key, j, keyVal, parent);
        }

    }


    const mergeSort = (arr, leftIndex, rightIndex) => {
        // console.log( arr, leftIndex, rightIndex);
        const merge = (arr, leftIndex, midPoint, rightIndex) => {
            let parent = document.getElementsByClassName('chart')[0]
            let colors = ['#3f28d1', '#287fd1', '#28d1be', '#28d12a', '#d1d028', '#d16b28', '#d12828']
            let n1 = midPoint - leftIndex + 1;
            let n2 = rightIndex - midPoint;

            let tempLeft = new Array(n1)
            let tempRight = new Array(n2)

            // copy data to arrays
            for (let i = 0; i < n1; i++) {
                tempLeft[i] = arr[leftIndex + i];
            }
            for (let j = 0; j < n2; j++) {
                tempRight[j] = arr[midPoint + 1 + j];
            }
            // Initial index of first subarray
            let i = 0;
            // Initial index of second subarray
            let j = 0
            // Initial index of merged subarray
            let k = leftIndex;
            while (i < n1 && j < n2) {
                // console.log(k, 'i < n1 && j < n2')
                if (tempLeft[i].value <= tempRight[j].value) {
                    arr[k] = tempLeft[i];
                    parent.insertBefore(parent.children[k], parent.children[i])
                    parent.children[k].style.backgroundColor = colors[i];

                    // console.log(i)
                    i++;
                }
                else {
                    arr[k] = tempRight[j];
                    parent.insertBefore(parent.children[k], parent.children[j])
                    j++;
                }
                console.log(i, n1)

                k++;
            }
            while (i < n1) {
                // console.log(k, 'i < n1')
                arr[k] = tempLeft[i];
                // parent.children[i].style.backgroundColor = '#30c930';
                parent.insertBefore(parent.children[k], parent.children[i])
                i++;
                k++
            }
            while (j < n2) {
                // console.log(k, 'j < n2')
                arr[k] = tempRight[j];
                // parent.children[k].style.backgroundColor = '#d16328';
                parent.insertBefore(parent.children[k], parent.children[j])
                j++;
                k++;
            }
        }

        if (leftIndex >= rightIndex) {
            // console.log('return initiated')
            return //returns recursively
        }

        let midPoint = leftIndex + parseInt((rightIndex - leftIndex) / 2);
        
        // setTimeout(() => {
        mergeSort(arr, leftIndex, midPoint);
        // }, 500);

        // setTimeout(() => {
        mergeSort(arr, midPoint + 1, rightIndex);
        // }, 500);

        // setTimeout(() => {
        merge(arr, leftIndex, midPoint, rightIndex);
        // }, 500);

        
    }

    const quickSort = () => {

    }

    const countingSort = () => {

    }

    return (
        <div className='chart' ref={board}>
            {Object.keys(columnsList).length > 0 ? columnsList.map(({ id, value, sorted, sorting }, index) => (
                <div key={id} className='column' style={{
                    width: `${columnWidth}px`,
                    height: `${value * 10}px`,
                    // backgroundColor: `${defaultColour} #${sorted ? null : defaultColour}`
                    backgroundColor: defaultColour
                }} />
            ))
                : null}

        </div>
    )
}
