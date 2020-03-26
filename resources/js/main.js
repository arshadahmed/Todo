var todoItem = document.getElementById("item");
var addItem = document.getElementById("add");
var incompItems = document.getElementById("todo");

function submit(){

  var firebaseRef = firebase.database().ref('Todo/');
  var newItem = todoItem.value;
  firebaseRef.push().set(newItem);
}


var childRef = firebase.database().ref("Todo");
//console.log(childRef);
childRef.on("child_added", snap => {

var li = document.createElement('li');
li.innerText = snap.val();
incompItems.appendChild(li);

});




  















//var tododata = snap.child("Todo").val();
  //$("todo").append("<ul>+ tododata + </ul>");
  //console.log(tododata);
  