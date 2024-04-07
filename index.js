const name_a_node = document.querySelector('#name_a');
const name_b_node = document.querySelector('#name_b');

const set_a_node = document.querySelector('#set_a');
const set_b_node = document.querySelector('#set_b');
const point_a_node = document.querySelector('#point_a');
const point_b_node = document.querySelector('#point_b');

let socket = new WebSocket("ws://192.168.0.166:8999/");

socket.onmessage = function(event) {
    const { set_a, set_b, point_a, point_b, name_a, name_b } = JSON.parse(event.data);
    set_a_node.innerHTML = set_a;
    set_b_node.innerHTML = set_b;
    point_a_node.innerHTML = point_a;
    point_b_node.innerHTML = point_b;
    name_a_node.innerHTML = name_a;
    name_b_node.innerHTML = name_b;
};

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  } else {
    console.log('[close] Соединение прервано');
  }
};

socket.onerror = function(error) {
  console.log(`[error]`);
};