const weatherForm = document.getElementById('location-form')
const search = document.getElementById('location-search')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

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