const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    p1.textContent = "Loading weather data...";
    p2.textContent = "";

    fetch('/weather?address='+searchElement.value).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                p1.textContent = data.error;
            } else {
                p1.innerHTML = data.location;
                p2.innerHTML = data.forecast;
            }
        })
    })
})