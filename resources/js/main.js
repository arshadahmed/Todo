var todoItem = document.getElementById("item");
var addItem = document.getElementById("add");
var incompItems = document.getElementById("todo");
var completedItems = document.getElementById("completedList");
//var newRef = firebase.database().ref().child("Deleted");

// Remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

// Move deleted record to deleted object. define paths while calling this function "newRef and oldRef"
// function movedeletedRecord(oldRef, newRef) {    
//   return Promise((resolve, reject) => {
//        oldRef.once('value').then(snap => {
//             return newRef.set(snap.val());
//        }).then(() => {
//             return oldRef.set(null);
//        }).then(() => {
//             console.log('Done!');
//             resolve();
//        }).catch(err => {
//             console.log(err.message);
//             reject();
//        });
//   })
// }


//add the task to the list
function submit(){

  var firebaseRef = firebase.database().ref().child("Todo");
  var newItem = todoItem.value;
  firebaseRef.child(newItem).set({
    
      task: newItem,
      status: "incomplete"
    
    
  });
  document.getElementById('item').value = '';
   
}



  function getParent(snapshot) {
    // You can get the reference (A Firebase object) from a snapshot
    // using .ref().
    var ref = snapshot.ref();
    console.log(ref);
    // Now simply find the parent and return the name.
    //return ref.parent().name();
  }
  
  

function completeItem(){

  var completeRef = firebase.database().ref().child("Todo").child("status");
  completeRef.once('value',function(snapshot){
    snapshot.forEach(function(item){
      console.log(item.key + ":" +  JSON.stringify(item.val()));
    })
  })
}



//retrieving data from firebase for INCOMPLETE items and displaying on the webpage
var childRef = firebase.database().ref().child("Todo").orderByChild("status").equalTo("incomplete");
//console.log(childRef);
childRef.on("child_added", snap => {

  
var li = document.createElement('li');
li.innerText = snap.child("task").val();
var id = li.innerText;


incompItems.appendChild(li);


var buttons = document.createElement('div');
  buttons.classList.add('buttons');
  
  var remove = document.createElement('button');
  remove.classList.add('remove');

  //remove.innerText = "remove";
  remove.innerHTML = removeSVG;

  
  
  // Add click event for removing the item and a function to hide the "li" and remove it
  remove.addEventListener('click', function(removeItem){
     
      
      var incompRef = firebase.database().ref("Todo").child(id);
      //var ref = removeRef.child(id);
       var div = this.parentElement.parentElement;
      
      incompRef.remove(); 
      
      div.style.display = "none";
      console.log("Task Deleted:" + id);
    });
  

  var complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;
  complete.addEventListener('click', function(completeItem){

      var incompRef = firebase.database().ref("Todo").child(id);
      //var ref = removeRef.child(id);
      var div = this.parentElement.parentElement;
       
      
      incompRef.update({
status: "completed"
      }); 
      
      div.style.display = "none";
      console.log("Task status set to completed :" + id);
    });
  
  
  buttons.appendChild(remove);
  buttons.appendChild(complete);
  li.appendChild(buttons);


  
});

//retrieving data from firebase for COMPLETE items and displaying on the webpage
var compRef = firebase.database().ref().child("Todo").orderByChild("status").equalTo("completed");
//var test = childRef.value;

compRef.on("child_added", snap => {
  
var listCompItems = document.createElement('li');
listCompItems.innerText = snap.child("task").val();
var id = listCompItems.innerText;

completedItems.appendChild(listCompItems);


var buttons = document.createElement('div');
  buttons.classList.add('buttons');
  
  var remove = document.createElement('button');
  remove.classList.add('remove');

  //remove.innerText = "remove";
  remove.innerHTML = removeSVG;
  
  // Add click event for removing the item and a function to hide the "li" and remove it
  remove.addEventListener('click', function(removeItem){
    var id = listCompItems.innerText;
    
    var removeRef = firebase.database().ref("Todo").child(id);
    
    var div = this.parentElement.parentElement;
    
    removeRef.remove(); 
    
    div.style.display = "none";
    console.log("Task Deleted" + id);
  });
  

  var complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;
  complete.addEventListener('click', function(completeItem){

    var incompRef = firebase.database().ref("Todo").child(id);
    //var ref = removeRef.child(id);
    var div = this.parentElement.parentElement;
     
    
    incompRef.update({
status: "incomplete"
    }); 
    
    div.style.display = "none";
    console.log("Task status set to incomplete :" + id);
  });

  
  
  buttons.appendChild(remove);
  buttons.appendChild(complete);
  listCompItems.appendChild(buttons);
});





// // TESTING ARENA

// function snapshotToArray(snapshot) {
//   var returnArr = [];

//   snapshot.forEach(function(childSnapshot) {
//       var item = childSnapshot.val();
//        item.key = childSnapshot.key;

//       returnArr.push(item);
//   });

//   return returnArr;
// };


// var x = firebase.database().ref('/Todo').on('value', function(snapshot) {
//    var x = snapshotToArray(snapshot);
   
//   console.log(x);
// });

// console.log(x);
