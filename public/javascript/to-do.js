
const todoArr = [...document.getElementById('toDoWrap').children];

const btns = [...document.getElementsByName("edit")];


for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', editToggle(i));
}




function editToggle(i) {
   return function() {
       console.log(this.id);
       let num = this.id.match(/(\d+)/);
       //console.log(num)
   };
}




console.log(btns);

console.log(todoArr);
console.log([...todoArr[0].children]);






/*
function displayContent(content) {

      var displayWrap = document.getElementById('display');

      console.log(content[0].cd.length)
      console.log(content[0].cd.length)
      for (var i = 0; i < content[0].cd.length; i++) {

          const div = document.createElement('div');
          div.id = 'book' + i
          div.classList.add('books');


          for(var elm in content[0].cd[i]) {
            const row = document.createElement('div');

            const property = document.createElement('span');
            property.classList.add('property');
            const propertyTxt = document.createTextNode(elm + ': ');
            property.appendChild(propertyTxt);
            row.appendChild(property);

            const value = document.createElement('span');
            value.classList.add('value');
            const valueTxt = document.createTextNode(content[0].cd[i][elm]);
            value.appendChild(valueTxt);
            row.appendChild(value);

            div.appendChild(row);
          }

          // Delete Btn
          const del = document.createElement('button');
          del.id = 'del' + i
          const delTxt = document.createTextNode('Delete');
          del.appendChild(delTxt);
          del.addEventListener('click', deleteBook)
          div.appendChild(del);

          // Edit Btn
          const edit = document.createElement('button');
          edit.id = 'edit' + i
          const editTxt = document.createTextNode('Edit');
          edit.appendChild(editTxt);
          edit.addEventListener('click', editBook)
          div.appendChild(edit);

          displayWrap.appendChild(div)

      }

  };
*/
