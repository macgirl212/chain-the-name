import { alphabetArray, allNamesArray } from "../wordArrays"

const findName = (name: string, letter: string) => {
    // find the current array by first letter and remove all dashes and uppercase letters in array
    const index = alphabetArray.indexOf(letter)
    const chosenArray = allNamesArray[index].map((name: string) => { return name.replaceAll('-', '').toLowerCase() })

    // find matching name and return it with its original spelling
    if (chosenArray.includes(name)) {
        const nameIndex: number = chosenArray.indexOf(name)
        return allNamesArray[index][nameIndex]
    } else {
        return false
    }
}

export default findName