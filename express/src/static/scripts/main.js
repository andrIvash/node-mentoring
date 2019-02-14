console.log('hello there !!!');

const status = document.querySelector('.status');
const del = document.querySelector('.del');
const reset = document.querySelector('.btn-reset');
const form = document.querySelector('#form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let data = {
    username: form.username.value,
    password: form.password.value
  };
  sendData('/api/auth2', data);
});

del.addEventListener('click',(e) => {
  e.preventDefault();
  sendData('/api/del', {});
});

reset.addEventListener('click',(e) => {
  e.preventDefault();
  form.reset();
  status.innerHTML = '';
});

function sendData (url, data) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));

  xhr.onreadystatechange = function () {
    if (this.readyState !== 4) return;

    if (xhr.status !== 200) {
      console.warn(xhr.status + ': ' + xhr.statusText);
    }
    let result = JSON.parse(xhr.responseText);
    status.innerHTML = result.status;
  };
}
