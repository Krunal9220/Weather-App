const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    p1.innerHTML = "Loading weather data...";
    p2.textContent = "";

    fetch('/weather?address='+searchElement.value).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                p1.innerHTML = data.error;
            } else {
                p1.textContent = data.location;
                p2.textContent = data.forecast;
            }
        })
    })
})