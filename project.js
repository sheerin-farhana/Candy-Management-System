
let candyName = document.getElementById('candyname')

let description = document.getElementById('description')
let price = document.getElementById('price')
let quantity = document.getElementById('quantity')

let addItemBtn = document.getElementById('additem');

addItemBtn.addEventListener('click',function(){
    let candyNameValue = candyName.value;
    let descriptionValue = description.value;
    let priceValue = price.value;
    let quantityValue = quantity.value;

    let candyobj = 
    {
        'candyname':candyNameValue,
        'description':descriptionValue,
        'price':priceValue,
        'quantity':quantityValue
    }

    axios.post('https://crudcrud.com/api/71db2c4322e04374983706fdf4b54cdc/candydata',candyobj)
    .then((res)=>{
        let candydata = res.data;

        let candydataObj = 
        {
            'candyname':res.data.candyname,
            'description':res.data.description,
            'price':res.data.price,
            'quantity':res.data.quantity
        }
        console.log(candydataObj);
        showContentOnScreen(candydataObj);
    })
    .catch((error) => console.log(error));

    


})


function showContentOnScreen(user){

    let table = document.getElementById('datatable');

    let tr = document.createElement('tr');
    tr.classList = "table-primary table-bordered table";

    let td1 = document.createElement('td');
    td1.textContent = user.candyname;
  
    let td2 = document.createElement('td');
    td2.textContent = user.description;
    
    let td3 = document.createElement('td');
    td3.textContent = user.price;
   
    let td4 = document.createElement('td');
    td4.textContent = user.quantity;

    

    let buyOneBtn = document.createElement('button');
    buyOneBtn.textContent = 'BUY ONE';

    let buyTwoBtn = document.createElement('button');
    buyTwoBtn.textContent = 'BUY TWO';

    let buyThreeBtn = document.createElement('button');
    buyThreeBtn.textContent = 'BUY THREE';

    let td5 = document.createElement('td');
    
    td5.appendChild(buyOneBtn)
    let td6 = document.createElement('td');
    td6.appendChild(buyTwoBtn);
    let td7 = document.createElement('td');
    td7.appendChild(buyThreeBtn)
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    tr.append(td6);
    tr.append(td7);
    table.append(tr);

    buyOneBtn.addEventListener('click',function(e){
       
        let candyId = user._id;
        let updatedCandyData = {
            candyname: user.candyname,
            description: user.description,
            price: user.price,
            quantity: user.quantity - 1
        };

        if(user.quantity >0){
            axios.put(`https://crudcrud.com/api/71db2c4322e04374983706fdf4b54cdc/candydata/${candyId}`,updatedCandyData)
    .then((res) => {
        let updatedQuantity = user.quantity-1;
        user.quantity = updatedQuantity;
        td4.textContent = updatedQuantity;
        
    })
    .catch((err)=>{
        console.log(err);
    })
        }
        else{
            alert(`no  chocolates available`)
        }


        
    })

    buyTwoBtn.addEventListener('click',function(){
        let candyId = user._id;
        let updatedCandyData = {
            candyname: user.candyname,
            description: user.description,
            price: user.price,
            quantity: user.quantity - 2
        };

        if(user.quantity >0){
            axios.put(`https://crudcrud.com/api/71db2c4322e04374983706fdf4b54cdc/candydata/${candyId}`,updatedCandyData)
    .then((res) => {
        let updatedQuantity = user.quantity-2;
        user.quantity = updatedQuantity;
        td4.textContent = updatedQuantity;
        
    })
    .catch((err)=>{
        console.log(err);
    })
        }
        else{
            alert(`no chocolates available`)
        }


    })

    buyThreeBtn.addEventListener('click',function(){
        let candyId = user._id;
        let updatedCandyData = {
            candyname: user.candyname,
            description: user.description,
            price: user.price,
            quantity: user.quantity - 3
        };

        if(user.quantity >0){
            axios.put(`https://crudcrud.com/api/71db2c4322e04374983706fdf4b54cdc/candydata/${candyId}`,updatedCandyData)
    .then((res) => {
        let updatedQuantity = user.quantity-3;
        user.quantity = updatedQuantity;
        td4.textContent = updatedQuantity;
        
    })
    .catch((err)=>{
        console.log(err);
    })
        }
        else{
            alert(`no chocolates available`)
        }


        
    })

    
}

document.addEventListener('DOMContentLoaded', function() {
    // DOM manipulation code to display data
    axios.get('https://crudcrud.com/api/71db2c4322e04374983706fdf4b54cdc/candydata')
    .then((res)=>{
        console.log('loaded content',res.data);
        let candydata = res.data;
        candydata.forEach(candy => {
            showContentOnScreen(candy);
        });
    })
});