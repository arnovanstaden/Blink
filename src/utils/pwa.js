export const registerServiceWorker = () => {

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function (registration) {
                registration.addEventListener('updatefound', function () {
                    let installingWorker = registration.installing;
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}