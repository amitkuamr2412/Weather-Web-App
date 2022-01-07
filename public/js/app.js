// console.log('Javascript CLient loaded')


const location_form = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message1')
const msg2 = document.querySelector('#message2')
const msg3 = document.querySelector('#message3')
const msg4 = document.querySelector('#message4')

location_form.addEventListener('submit', (e) => {
    const location = search.value ;
    e.preventDefault()
   // console.log(location)
   fetch('/weather?address='+location).then( (response) => {
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            msg1.textContent = data.error
            msg2.textContent = ''
            msg3.textContent = ''
            msg4.textContent = ''
        }
        else{
            console.log(data.forecast.Summary[0]);
            console.log(data.forecast.Temperature);
            console.log(data.address);

            msg1.textContent ='Summary: '+ data.forecast.Summary[0]
            msg2.textContent = 'Temperature: ' + data.forecast.Temperature
            msg3.textContent = 'Precipitation: ' + data.forecast.Precipitation+' %'
            msg4.textContent = 'Location: ' + data.forecast.place
        }
    })
})

})