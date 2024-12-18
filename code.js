let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let btn=document.getElementById('btn');

let mood='create';
let tmp;

// gettotal price 
function gettotal(){
    if (price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) 
        - +discount.value ; 
        total.innerHTML=result;
        total.style.backgroundColor="green"
    }
    else{
        total.innerHTML='';
        total.style.backgroundColor="red"
    }
}
// create item
let datapro=[];
if(localStorage.product != null ){
    datapro=JSON.parse(localStorage.product);
}
else{
    datapro =[];

}

btn.onclick=function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        count:count.value,
        category:category.value.toLowerCase(),
        total:total.innerHTML,
    }
    if(newpro.title != '' &&
        newpro.price !='' &&
        newpro.category != '' &&
        newpro.count <= 100
    ){ // clear data
        if(mood == 'create'){
        if(newpro.count > 1){
            for(let i=0 ; i < newpro.count ; i++){
                datapro.push(newpro)
            }
            }
            else{
                datapro.push(newpro)
            }
    }
    else{
        datapro[tmp]=newpro;
        mood ="create"
        btn.innerHTML='create'
        count.style.display='block'
    }
    clear()
    }else if(newpro.title == ''){ // alert to sign item
        title.placeholder='please enter a title';
    }
    else if(newpro.price == ''){ // alert to sign item
        price.placeholder='please enter a price';
    }
    else if(newpro.category == ''){ // alert to sign item
        category.placeholder='please enter a category';
    }
    
    
    
    localStorage.setItem('product',JSON.stringify(datapro))
    
    showdata()
    
}


// clear after create

function clear(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    category.value='';
    total.innerHTML='';
    total.style.background='red'
}

// read data 

function showdata(){
    let table ='';
    for( let i =0 ; i < datapro.length ; i++){
        table +=`
        <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick='updatedata(${i})' id="update">update</button></td>
                        <td><button onclick='deleteitem(${i})' id="delete">delete</button></td>
        </tr>
                    `;
    }
    document.getElementById('tbody').innerHTML=table;
    // button delete all
    let btndelall =document.getElementById('delall');
    if (datapro.length > 0){
        btndelall.innerHTML=`
        <button onclick='deleteall()'>delete all ( ${datapro.length} ) </button>
        `
    }
    else{
        btndelall.innerHTML='';
    }
}
showdata()

// delete item 

function deleteitem(i){
datapro.splice(i,1);
localStorage.product= JSON.stringify(datapro) ;
showdata()
}

// delete all item

function deleteall(){
    localStorage.clear()
datapro.splice(0);
showdata()
}

// count any num of item

// update
function updatedata(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    gettotal();
    count.style.display='none';
    category.value=datapro[i].category;
    btn.innerHTML='update'
    tmp=i;
    mood ='update'
    scroll({
        top : 0, 
        behavior:"smooth",
        })
}


// search 

// know type of search
function getsearchby(id){
    let search =document.getElementById('search');
    if( id == 'searchtitle'){
        searchmood= 'title';
    }else if(id == 'searchcatogery'){
        searchmood='category';
    }
    else
    {
        searchmood='price';
    }
    search.placeholder='search by '+ searchmood;
    search.focus();
    search.value='';
    showdata()
}
// search by type
function getsearch(value){
    let table ='';
    for(let i=0 ; i< datapro.length; i++){
        if(searchmood=='title') // search by title 
        {
            if(datapro[i].title.includes(value.toLowerCase())){
                table +=`
        <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick='updatedata(${i})' id="update">update</button></td>
                        <td><button onclick='deleteitem(${i})' id="delete">delete</button></td>
        </tr>
                    `;
            }
        }
        else if(searchmood=='category') // search by category
        {
            if(datapro[i].category.includes(value.toLowerCase())){
                table +=`
        <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick='updatedata(${i})' id="update">update</button></td>
                        <td><button onclick='deleteitem(${i})' id="delete">delete</button></td>
        </tr>
                    `;
            }
        
        }
        else{// search by price
            if(datapro[i].price <= value){
                table +=`
        <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick='updatedata(${i})' id="update">update</button></td>
                        <td><button onclick='deleteitem(${i})' id="delete">delete</button></td>
        </tr>
                    `;
            }
        }
        document.getElementById('tbody').innerHTML=table;
    
    }
}

