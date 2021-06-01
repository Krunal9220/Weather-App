const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const myLocation = document.querySelector('#my-location');
const submit = weatherForm.querySelector('button');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    submit.disabled = true;
    myLocation.disabled = true;

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
            submit.disabled = false;
            myLocation.disabled = false;
        })
    })
})

myLocation.addEventListener('click', () => {
    if(!navigator.geolocation) {
        alert('Geolocation is not supported by your browser!');
    }
    submit.disabled = true;
    myLocation.disabled = true;
    searchElement.value = '';
    
    navigator.geolocation.getCurrentPosition((position) => {

        p1.textContent = "Loading weather data...";
        p2.textContent = "";
        
        fetch('/weather?position='+position.coords.latitude+ ',' +position.coords.longitude).then((response) => response.json())
        .then((data) => {
                if(data.error) {
                    p1.textContent = data.error;
                } else {
                    p1.innerHTML = data.location;
                    p2.innerHTML = data.forecast;
                }
                submit.disabled = false;
                myLocation.disabled = false;
        }).catch((e) => {
            p1.textContent = e;
        });
    })
})