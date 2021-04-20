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