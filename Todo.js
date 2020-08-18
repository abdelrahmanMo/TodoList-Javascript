generateli();
var closes;
var licomplete;
//generateClose();
var element = {
  id: 0,
  title: '',
  complete: false,
};

//add New element
$('#Add').on('click', function () {
  let oldItems = [];
  let items = JSON.parse(localStorage.getItem('itemsArray'));

  let id =
    items == null || items.length === 0
      ? 1
      : parseInt(items[items.length - 1].id) + 1;
  let inputvalue = $('#myInput').val();
  $('#myInput').val('');
  if (inputvalue == '') {
    alert('you must write title');
  } else {
    element.id = id;
    element.title = inputvalue;
    oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];

    oldItems.push(element);

    localStorage.setItem('itemsArray', JSON.stringify(oldItems));
    generateli();
  }
});

function generateli() {
  let ul = document.getElementById('myUL');
  ul.innerHTML = '';
  let items = JSON.parse(localStorage.getItem('itemsArray'));
  if (items != null) {
    for (let item in items) {
      if (items[item].complete == true) {
        $('#myUL').append(
          "<li class ='checked' id='" +
            items[item].id +
            "'>" +
            items[item].title +
            "<span class='close'>×</span></li>"
        );
      } else {
        $('#myUL').append(
          "<li id='" +
            items[item].id +
            "'>" +
            items[item].title +
            "<span class='close'>×</span> </li>"
        );
      }
    }
    closes = document.getElementsByClassName('close');
    licomplete = document.getElementsByTagName('li');
    closesGenerate();

    addcheckedClass();
  } else {
    return;
  }
}

function closesGenerate() {
  for (let i = 0; i < closes.length; i++) {
    closes[i].addEventListener('click', function (e) {
      let currentelement = e.target.parentElement.id;
      let items = JSON.parse(localStorage.getItem('itemsArray'));
      let newitems = items.filter((item) => item.id != currentelement);
      localStorage.setItem('itemsArray', JSON.stringify(newitems));

      generateli();
    });
  }
}

function addcheckedClass() {
  for (let i = 0; i < licomplete.length; i++) {
    licomplete[i].addEventListener('click', function (e) {
      let items = JSON.parse(localStorage.getItem('itemsArray'));
      for (let item in items) {
        if (items[item].id == e.target.id && e.target.classList != 'checked') {
          items[item].complete = true;
        } else if (
          items[item].id == e.target.id &&
          e.target.classList == 'checked'
        ) {
          items[item].complete = false;
        }
      }
      localStorage.setItem('itemsArray', JSON.stringify(items));
      generateli();
    });
  }
}
