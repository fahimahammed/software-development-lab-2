const getInputValue = (id) => {
    return document.getElementById(id).value;
}

async function addDish()  {
    const dishData = {
        name: getInputValue('name'),
        price: getInputValue('price'),
        quantity: getInputValue('quantity')
    }

    // console.log(dishData);
    const url = `http://localhost:3000/dishes`;
    const res = await fetch(url, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dishData)
    })
    .then(res => alert(res));
}


const loadDishData = () => {
    fetch('http://localhost:3000/dishes')
    .then(res => res.json())
    .then(data => displayDishData(data))
}

const displayDishData = (data) => {
    const dishContainer = document.getElementById('dish-container');
    for(const singleData of data){
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${singleData.name}</td>
            <td>${singleData.price}</td>
            <td>${singleData.quantity}</td>
        `
        dishContainer.appendChild(tableRow);
    }
}

loadDishData();