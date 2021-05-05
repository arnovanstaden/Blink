export const validateForm = (e) => {
    e.preventDefault()
    let form = document.getElementById(e.target.form.id);

    // Validate
    if (form.checkValidity() === false) {
        return false
    }

    return true
}

export const removeChildClass = (selector, classToRemove) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        if (element.classList) {
            element.classList.remove(classToRemove)
        }
    })
}

export const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}