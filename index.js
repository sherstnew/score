const name_a_node = document.querySelector('#name_a');
const name_b_node = document.querySelector('#name_b');

const set_a_node = document.querySelector('#set_a');
const set_b_node = document.querySelector('#set_b');
const point_a_node = document.querySelector('#point_a');
const point_b_node = document.querySelector('#point_b');

const logo_a_node = document.querySelector('#logo_a');
const logo_b_node = document.querySelector('#logo_b');

const indicator_a_node = document.querySelector('#indicator_a');
const indicator_b_node = document.querySelector('#indicator_b');

const timeout_a_node = document.querySelector('#timeout_a');
const timeout_b_node = document.querySelector('#timeout_b');

const tablo = document.querySelector('.tablo');

let socket = new WebSocket("wss://kasik.skfxteam.ru/score/api/");

let params = new URL(document.location).searchParams;
let gameid_param = params.get("gameid");

if (!gameid_param) {
  gameid_param = "1"
}

socket.onmessage = function(event) {

    const current_points_a = Number(point_a_node.innerHTML);
    const current_points_b = Number(point_b_node.innerHTML);

    const { gameid, set_a, set_b, point_a, point_b, name_a, name_b, logo_a, logo_b, timeout_a, timeout_b, sets } = JSON.parse(event.data);
    if (gameid === gameid_param) {
      set_a_node.innerHTML = set_a;
      set_b_node.innerHTML = set_b;
      point_a_node.innerHTML = point_a;
      point_b_node.innerHTML = point_b;
      name_a_node.innerHTML = name_a;
      name_b_node.innerHTML = name_b;
      logo_a_node.src = './images/teamlogos/' + logo_a;
      logo_b_node.src = './images/teamlogos/' + logo_b;

      if (timeout_a) {
        if (timeout_a_node.classList.contains("timeout-hidden")) {
          timeout_a_node.classList.add("timeout-visible");
          timeout_a_node.classList.remove("timeout-hidden");
        };
      } else {
        if (timeout_a_node.classList.contains("timeout-visible")) {
          timeout_a_node.classList.add("timeout-hidden");
          timeout_a_node.classList.remove("timeout-visible");
        };
      };
      if (timeout_b) {
        if (timeout_b_node.classList.contains("timeout-hidden")) {
          timeout_b_node.classList.add("timeout-visible");
          timeout_b_node.classList.remove("timeout-hidden");
        };
      } else {
        if (timeout_b_node.classList.contains("timeout-visible")) {
          timeout_b_node.classList.add("timeout-hidden");
          timeout_b_node.classList.remove("timeout-visible");
        };
      };

      if (point_a > current_points_a) {
        indicator_a_node.style.opacity = 1;
      } else if (!(point_a <= current_points_a && point_b <= current_points_b)) {
        indicator_a_node.style.opacity = 0;
      };

      if (point_b > current_points_b) {
        indicator_b_node.style.opacity = 1;
      } else if (!(point_a <= current_points_a && point_b <= current_points_b)) {
        indicator_b_node.style.opacity = 0;
      };

      while (tablo.lastChild) {
        tablo.removeChild(tablo.lastChild);
      };
      
      if (sets.length > 0) {
        sets.forEach(set => {
          const newSet = document.createElement('div');
          newSet.classList.add("score_set");
          newSet.innerHTML = set;
          tablo.append(newSet);
        });
      } else {
        const newSet = document.createElement('div');
        newSet.classList.add("score_set");
        newSet.innerHTML = `${point_a_node.innerHTML}:${point_b_node.innerHTML}`;
        tablo.append(newSet);
      }
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
