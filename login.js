const signinBtn = document.getElementById('button');
const emailInput = document.getElementsByClassName('email');
const form = document.getElementById('form');
const alert = document.querySelector('.alert');

let email = '';
let password = '';

let user = [{
    email: 'gashdrini@gmail.com',
    password: 'dringashi'
  },
  {
    email: 'drin@gmail.com',
    password: 'drin'
  },
  {
    email: 'gash@gmail.com',
    password: 'gash'
  },
]

signinBtn.addEventListener('click', (e) => {
  e.preventDefault();
  email = form.elements['email'].value;
  password = form.elements[1].value;

  if (email === 'admin' && password === 'admin') {
    location.href = "admin.html";
  } else if (email === user[0].email && password === user[0].password ||
    email === user[1].email && password === user[1].password ||
    email === user[2].email && password === user[2].password) {
    location.href = "index.html";
  } else {
    alert.classList.add("show");
    form.elements[1].value = '';
    form.elements['email'].value = '';
    setTimeout(function() {
      alert.classList.remove("show");
    }, 2000);
  }
});
