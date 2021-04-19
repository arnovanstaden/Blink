export const validateForm = (e) => {
    e.preventDefault()
    let form = document.getElementById(e.target.form.id);

    // Validate
    if (form.checkValidity() === false) {
        return false
    }

    return true
}