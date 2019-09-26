const weatherForm = document.getElementById('location-form')
const search = document.getElementById('location-search')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

document.getElementById('currentLocation').addEventListener('click', (e) => {
    messageOne.innerHTML = '<p class="info">Detecting location...</p>'
    messageTwo.innerHTML = ''
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            fetch('http://localhost:3000/weather/lat/'+position.coords.latitude+'/lon/'+position.coords.longitude).then( (response) => {
                response.json().then( (data) => {
                    if(data.error)
                        messageOne.innerHTML = '<p class="error">'+data.error+'.</p>'
                    else {
                        messageOne.innerHTML = '<p class="success">'+data.forecast+'.</p>'
                    }
                })
            })
        });
    } else { 
        messageOne.innerHTML = '<p class="warning">Geolocation is not supported in this browser.</p>'
    }
})

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.innerHTML = '<p class="info">Loading...</p>'
    messageTwo.innerHTML = ''

    const location = search.value

    if(!location) 
        messageOne.innerHTML = '<p class="warning">Please, Enter any location.</p>'
    else
        fetch('http://localhost:3000/weather?address=' + location).then( (response) => {
            response.json().then( (data) => {
                if(data.error)
                    messageOne.innerHTML = '<p class="error">'+data.error+'.</p>'
                else {
                    messageOne.innerHTML = '<p class="success">'+data.location+'.</p>'
                    messageTwo.innerHTML = '<p class="success">'+data.forecast+'.</p>'
                }
            })
        })
})