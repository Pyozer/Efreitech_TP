module.exports = class mSort {

    static bubble(array) {
        let sortArray = array.slice();

        if (sortArray.length == 1)
            return sortArray;

        for (let i = 0; i < sortArray.length - 1; i++) { // For each elements
            for (let j = 0; j < sortArray.length - 1; j++) { // Compare each element to others
                if (sortArray[j] > sortArray[j + 1]) { // If current element is greater than next
                    // Switch elements
                    let temp = sortArray[j];
                    sortArray[j] = sortArray[j + 1];
                    sortArray[j + 1] = temp;
                }
            }
        }
        return sortArray;
    }

    static selection(array) {
        let originArray = array.slice();

        if (originArray.length == 1)
            return originArray;

        let sortArray = [];

        for (let i = 0; i < array.length; i++) { // For each elements
            let minIndex = 0; // init index of lower to 0
            for (let k = 0; k < originArray.length; k++) { // for each elements of unsorted list
                // Search lower element
                if (originArray[k] < originArray[minIndex]) {
                    minIndex = k;
                }
            }
            sortArray.push(originArray[minIndex]); // Add lower element to end of sorted list
            originArray.splice(minIndex, 1); // Remove lower element in unsorted list
        }
        return sortArray;
    }

    static insertion(array) {
        let originArray = array.slice();

        if (originArray.length == 1)
            return originArray;

        for (let currIndex = 1; currIndex < originArray.length; currIndex++) {
            const currElem = originArray[currIndex]; // Element to compare with left items

            let compIndex = currIndex - 1; // Start compare from first left of current element
            while (compIndex >= 0 && originArray[compIndex] > currElem) { // While left item is inferior
                originArray[compIndex + 1] = originArray[compIndex]; // Replace currElem comparaison index by left item
                compIndex--;
            }
            originArray[compIndex + 1] = currElem; // When finish comparaison, move element to his sorted position
        }

        return originArray;
    }

    static merge(array) {
        let originArray = array.slice();

        // If array is empty or has only one element
        if (originArray.length <= 1)
            return originArray;

        // Split array in two
        const middleIndex = Math.floor(originArray.length / 2);
        const left = originArray.slice(0, middleIndex);
        const right = originArray.slice(middleIndex);

        // Sort two halves of split array
        const leftSorted = this.merge(left);
        const rightSorted = this.merge(right);

        // Merge left and right sorted arrays
        return this.mergeSortedArrays(leftSorted, rightSorted);
    }

    static mergeSortedArrays(left, right) {
        let sortedArray = []; // Will contain sorted elements

        // While left and right part not empty
        while (left.length > 0 && right.length > 0) {
            let lowerElem;

            // Find lower element of two arrays
            if (left[0] < right[0])
                lowerElem = left.shift();
            else
                lowerElem = right.shift();
            // Push lower element of two arrays to sorted array
            sortedArray.push(lowerElem);
        }

        // If left part not empty, add elements to sorted
        if (left.length)
            sortedArray = sortedArray.concat(left);

        // If right part not empty, add elements to sorted
        if (right.length)
            sortedArray = sortedArray.concat(right);

        return sortedArray;
    }

    static quick(array) {
        let originArray = array.slice();

        if (originArray.length <= 1)
            return originArray;

        const left = [];
        const right = [];
        const pivot = originArray.pop();

        for (var i = 0; i < originArray.length; i++)
            if (originArray[i] <= pivot)
                left.push(originArray[i]);
            else
                right.push(originArray[i]);

        return [].concat(mSort.quick(left), pivot, mSort.quick(right));
    }
}