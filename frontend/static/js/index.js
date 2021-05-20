function call_click() {
    fetch('/api/call_click/', {
        method: 'GET'
    }).then(response => {
        if (response.ok) return response.json()
        else return Promise.reject(response)
    }).then(data => {
        const counter = document.getElementById('counter')
        counter.innerText = data.maincycle.click_count

        if (data.boosts) {
            update_boosts(data.boosts)
        }
    }).catch(err => console.log(err))
}


function buy_boost(boost_id) {
    const csrftoken = getCookie('csrftoken')

    fetch(`/api/buy_boost/`, {
        method: 'POST',
        headers: {
            "X-CSRFToken": csrftoken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            boost_id: boost_id
        })
    }).then(response => {
        if (response.ok) return response.json()
        else return Promise.reject(response)
    }).then(data => {
        const click_count = document.getElementById('counter')
        const power = document.getElementById('click_power')

        click_count.innerText = data.maincycle.click_count
        power.innerText = data.maincycle.click_power

        update_boosts(data.boosts)

    }).catch(err => console.log(err))
}


function update_boosts(boosts) {
    let boosts_holder = document.getElementById('boosts-holder')
    boosts_holder.innerHTML = ''

    boosts.forEach(boost => {
        add_boost(boosts_holder, boost)
    })
}

function add_boost(parent, boost) {
    const button = document.createElement('button')
    
    button.setAttribute('class', 'boost')
    button.setAttribute('id', `boost_${boost.id}`)
    button.setAttribute('onclick', `buy_boost(${boost.id})`)
    button.innerHTML = `
        <p>BOOST ${boost.id}</p>
        <p>POWER: <span id="boost_power">${boost.power}</span></p>
        <p>PRICE: <span id="boost_price">${boost.price}</span></p>
    `
    
    parent.appendChild(button)
}


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}