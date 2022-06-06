import React, { useState, useEffect } from 'react';
import './App.css';
import Sorting from './sorting/Sorting';
import Interface from './Interface/Interface';

function App() {
  const [columns, setcolumns] = useState(10);
  const [range, setrange] = useState({ min: 10, max: 20 });
  const [canRepeat, setcanRepeat] = useState(true);
  const [sortingType, setsortingType] = useState("Merge Sort");
  const [cansort, setcansort] = useState(false)
  const [test, settest] = useState(5)
  const [columnColour, setColumnColour] = useState('#282c34')

  const sortType = ['Insertion Sort', 'Merge Sort', 'Quicksort', 'Counting Sort']

  const updateColumns = (value) => {
    setcolumns(value)
  }

  const updateRange = (value, index) => {
    let object = range;
    object[index] = parseInt(value); 
    setrange(object);

    // for some reason the setrange state does not update renderer. 
    // When I have added test state, and replaced one of the input values I was able to update both values.
    // To debug, for now leaving this as it is.
    // Perhaps I'm just tired...

    // Okay, so Objects must have a specific item defined in the use effect to catch the change.


    settest(value)
  }

  const updateRepeat = (value) => {
    setcanRepeat(value);
  }

  const updateSortType = (val) => {
    let updatedSort = sortType.filter((item) => item == val)
    setsortingType(updatedSort[0])
  }

  const startSorting = () => {
    setcansort(true)
  }

  return (
    <div className="App">
      <Sorting
        columnsInt={columns}
        range={range}

        canRepeat={canRepeat}
        sortingType={sortingType}

        sortType={sortType}
        setcansort={setcansort}
        cansort={cansort}

        defaultColour={columnColour}
      />

      <Interface
        updateColumns={updateColumns}
        columnsInt={columns}

        updateRange={updateRange}
        range={range}
        test={test}

        updateRepeat={updateRepeat}
        canRepeat={canRepeat}

        sortType={sortType}
        sortingType={sortingType}
        updateSortType={updateSortType}

        cansort={cansort}
        startSorting={startSorting}
      />

    </div>
  );
}

export default App;
