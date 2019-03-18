//client side javascript

console.log('client side javascript file loaded')

const form = document.querySelector('form')
const cityName = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

form.addEventListener('submit', (event) => {
    //prevent default behavior of refreshing browser
    event.preventDefault()

    const location = cityName.value

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''

    //browser based API
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
            }
        })
    })
})