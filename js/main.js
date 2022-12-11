//Todo list app by Navneet Bharti
//features
//store in localstorage of browser
//delete list items

var addButton = document.getElementById('addButton')
var addInput = document.getElementById('itemInput')
var todoList = document.getElementById('todoList')
var listArray = []
//declare addToList function

// function listItemObj() {
//   this.content = ''
// }

window.onload = function () {
  var list = localStorage.getItem('localTasks')

  if (list != null) {
    listArray = JSON.parse(list)

    for (var i = 0; i < listArray.length; i++) {
      var item = createItemDom(listArray[i].content)
      todoList.appendChild(item)
    }
  }
}

var createItemDom = function (text) {
  var listItem = document.createElement('li')

  var itemLabel = document.createElement('label')

  var itemIncompBtn = document.createElement('button')

  listItem.className = 'well'
  itemLabel.innerText = text

  itemIncompBtn.className = 'btn btn-danger'
  itemIncompBtn.innerText = 'Delete'
  itemIncompBtn.addEventListener('click', removeItem)

  listItem.appendChild(itemLabel)
  listItem.appendChild(itemIncompBtn)

  return listItem
}

// window.onload = function () {
//   var list = localStorage.getItem('localTasks')

//   if (list != null) {
//     listArray = JSON.parse(list)

//     for (var i = 0; i < listArray.length; i++) {
//       var item = createItemDom(listArray[i].content)
//       todoList.appendChild(item)
//     }
//   }
// }

// var refreshLocal = function () {
//   localStorage.removeItem('localTasks')
//   localStorage.setItem('localTasks', JSON.stringify(listArray))
// }

var addToList = function () {
  var newItem = new listItemObj()
  newItem.content = addInput.value
  listArray.push(newItem)
  //add to the local storage
  refreshLocal()
  //change the dom
  var item = createItemDom(addInput.value)
  todoList.appendChild(item)
  addInput.value = ''
}

function listItemObj() {
  this.content = ''
}

var refreshLocal = function () {
  localStorage.removeItem('localTasks')
  localStorage.setItem('localTasks', JSON.stringify(listArray))
}

var removeItem = function () {
  var parent = this.parentElement.parentElement
  parent.removeChild(this.parentElement)

  var data = this.parentElement.firstChild.innerText
  for (var i = 0; i < listArray.length; i++) {
    if (listArray[i].content === data) {
      listArray.splice(i, 1)
      refreshLocal()
      break
    }
  }
}

//function to clear todo list array
var clearList = function () {
  listArray = []
  localStorage.removeItem('localTasks')
  todoList.innerHTML = ''
}

//add an event binder to the button
addButton.addEventListener('click', addToList)
clearButton.addEventListener('click', clearList)
