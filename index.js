const name_a_node = document.querySelector('#name_a');
const name_b_node = document.querySelector('#name_b');

const set_a_node = document.querySelector('#set_a');
const set_b_node = document.querySelector('#set_b');
const point_a_node = document.querySelector('#point_a');
const point_b_node = document.querySelector('#point_b');

const logo_a_node = document.querySelector('#logo_a');
const logo_b_node = document.querySelector('#logo_b');

let socket = new WebSocket("wss://score-yigf.onrender.com/");

let params = new URL(document.location).searchParams;
let gameid_param = params.get("gameid");

if (!gameid_param) {
  gameid_param = "1"
}

socket.onmessage = function(event) {
    const { gameid, set_a, set_b, point_a, point_b, name_a, name_b, logo_a, logo_b } = JSON.parse(event.data);
    if (gameid === gameid_param) {
      set_a_node.innerHTML = set_a;
      set_b_node.innerHTML = set_b;
      point_a_node.innerHTML = point_a;
      point_b_node.innerHTML = point_b;
      name_a_node.innerHTML = name_a;
      name_b_node.innerHTML = name_b;
      logo_a_node.src = './images/teamlogos/' + logo_a;
      logo_b_node.src = './images/teamlogos/' + logo_b;
    }
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