
var btns = Array.prototype.slice.call(document.querySelectorAll(".btn"))

console.log(btns);
btns.forEach(function(btn) {
    btn.addEventListener("click", function() {
        console.log(this.name, this.id)
        post(this.name, this.id)
    });
});

function post(name, id) {

  let data = {
    name: name,
    id: id
  }

  fetch("/admin", {
    method: "POST",
    body: JSON.stringify(data)
  }).then(res => {
    console.log("Request complete! response:", res);
  });

}
