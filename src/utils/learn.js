export const saveLearnProgress = (progress) => {
    localStorage.setItem('blink-learn-progress', JSON.stringify(progress));
}

export const getLearnProgress = () => {
    const progress = localStorage.getItem('blink-learn-progress');
    return JSON.parse(progress);
}

export const deleteLearnProgress = () => {
    localStorage.removeItem('blink-learn-progress');
}