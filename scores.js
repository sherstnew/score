const form = document.querySelector('.scores');

const set_a_input = document.querySelector('#set_a');
const point_a_input = document.querySelector('#point_a');
const set_b_input = document.querySelector('#set_b');
const point_b_input = document.querySelector('#point_b');

const set_a_add = document.querySelector('#set_a_add');
const set_a_remove = document.querySelector('#set_a_remove');
const point_a_add = document.querySelector('#point_a_add');
const point_a_remove = document.querySelector('#point_a_remove');

const set_b_add = document.querySelector('#set_b_add');
const set_b_remove = document.querySelector('#set_b_remove');
const point_b_add = document.querySelector('#point_b_add');
const point_b_remove = document.querySelector('#point_b_remove');

const name_a_input = document.querySelector('#name_a');
const name_b_input = document.querySelector('#name_b');

const logo_a_input = document.querySelector('#logo_a');
const logo_b_input = document.querySelector('#logo_b');

const submit_btn = document.querySelector('#submit_btn');
const reset_btn = document.querySelector('#reset_btn');

const gameid_input = document.querySelector('#gameid');

const timeout_a_checkbox = document.querySelector('#timeout_a');
const timeout_b_checkbox = document.querySelector('#timeout_b');

const sets_scores = document.querySelectorAll(".set_score");

const socket = new WebSocket("wss://kasik.skfxteam.ru/score/api/");

socket.onopen = () => {
    const send_scores = () => {

        submit_btn.style.color = "rgba(255, 255, 255, .5)";

        let sets = [];

        sets_scores.forEach(set => {
            if (set.value != "0:0" && set.value) {
                sets.push(set.value)
            }
        })

        const scores = {
            gameid: gameid_input.value,
            set_a: set_a_input.value,
            set_b: set_b_input.value,
            point_a: point_a_input.value,
            point_b: point_b_input.value,
            name_a: name_a_input.value,
            name_b: name_b_input.value,
            logo_a: logo_a_input.value,
            logo_b: logo_b_input.value,
            timeout_a: timeout_a_checkbox.checked,
            timeout_b: timeout_b_checkbox.checked,
            sets: sets
        }

        socket.send(JSON.stringify(scores));

        setTimeout(() => {
            submit_btn.style.color = "#ffffff";
        }, 500);
    };

    timeout_a_checkbox.addEventListener('change', (evt) => {
        send_scores();
    });
    timeout_b_checkbox.addEventListener('change', (evt) => {
        send_scores();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        send_scores();
    });

    reset_btn.addEventListener('click', (e) => {
        point_a_input.value = 0;
        point_b_input.value = 0;
        send_scores();
    });
};

set_a_add.addEventListener('click', (e) => {set_a_input.value = Number(set_a_input.value) + 1});
set_a_remove.addEventListener('click', (e) => {set_a_input.value = Number(set_a_input.value) - 1});
point_a_add.addEventListener('click', (e) => {point_a_input.value = Number(point_a_input.value) + 1});
point_a_remove.addEventListener('click', (e) => {point_a_input.value = Number(point_a_input.value) - 1});

set_b_add.addEventListener('click', (e) => {set_b_input.value = Number(set_b_input.value) + 1});
set_b_remove.addEventListener('click', (e) => {set_b_input.value = Number(set_b_input.value) - 1});
point_b_add.addEventListener('click', (e) => {point_b_input.value = Number(point_b_input.value) + 1});
point_b_remove.addEventListener('click', (e) => {point_b_input.value = Number(point_b_input.value) - 1});
