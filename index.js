let place={};

function readValue(property, value){
        place[property]=value;
}

window.addEventListener('load', displayTable());

function displayTable(){

let tableBody = document.getElementById('tablebody');

fetch("http://localhost:8000/api/v1/places")
    .then((response)=>response.json())
    .then((data)=>{
    
    let places = data.places;
     
    places.forEach((place, index) =>{
    let tableRow = document.createElement('tr');
    tableRow.classList.add('tableRow');

    let noTd = document.createElement('td');
    noTd.append(index+1);

    let nameTd = document.createElement('td');
    nameTd.append(place.name);

    let priceTd = document.createElement('td');
    priceTd.append(place.price);

    let packageTd = document.createElement('td');
    packageTd.append(place.package);

    let actionTd = document.createElement('td');
        
        let edit = document.createElement("i");
        edit.classList = "fa fa-pencil-square editicon";
        
        edit.addEventListener("click", function(){
            edit.setAttribute("data-bs-toggle", "modal");
            edit.setAttribute("data-bs-target", "#modalForm");
            showEditData(place);

        })

        let del = document.createElement("i");
        del.classList = "fa fa-trash trashicon";
        
        del.addEventListener("click", ()=>{
        deletePlace(place);
        })
        
     actionTd.append(edit, del);


    tableRow.append(noTd, nameTd, priceTd, packageTd, actionTd);
    tableBody.append(tableRow);

   }); 
})
.catch((err)=>{console.log(err)})
 
}

let placeUpdate=null;

function showEditData(place)
{
   
    placeUpdate={...place};

    document.getElementById("name").value=place.name;
    document.getElementById("price").value=place.price;
    document.getElementById("imageURL").value=place.imageURL;
    document.getElementById("package").value=place.package;
    document.getElementById("description").value=place.description;

}

function readValue(property,value)
{
    placeUpdate[property]=value;   
}

function updateData(){

    fetch(`http://localhost:8000/api/v1/places/${placeUpdate._id}`,{
            method:"PUT",
            body:JSON.stringify(placeUpdate),
            headers:{
                "Content-Type":"application/json",
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);

            console.log(places);

            let index=places.findIndex((p)=>{
                return p._id===data.place._id;
            })

            places[index]=data.place;
            displayTable();


        })
        .catch((err)=>{
            console.log(err);
        })

}

function addPlace()
{

    fetch("http://localhost:8000/api/v1/places",
    {
        method:"POST",
        body:JSON.stringify(place),
        headers:{
            "Content-Type":"application/json"
        }
    }
    )
    .then((response)=>response.json())
    .then((data)=>{console.log(data);})
    .catch((err)=>{
        console.log(err);
    })
    console.log(place);

}

function deletePlace(index){
    fetch(`http://localhost:8000/api/v1/places/${index._id}`,
    {
        method:"DELETE",

        headers:{"Content-Type":"application/json"
        }     
    }
)
.then((response)=>response.json() )
.then((data)=>{console.log(data);
    window.location.reload();
})
.catch((err)=>{
    console.log(err);
});

}
