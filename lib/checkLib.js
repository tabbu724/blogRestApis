let isEmpty = (value) => {
    if (value == '' || value == null || value == undefined || value.length == 0) {
        return true
    }
    else
        return false
}

let removeSpaces = (value) => {
    let strValue = String(value)
    let strWoSpaces = strValue.trim()
    return strWoSpaces
}

module.exports={
    isEmpty:isEmpty,
    removeSpaces:removeSpaces
}