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

const reset_btn = document.querySelector('#reset_btn');

const socket = new WebSocket("ws://192.168.0.166:8999/");

const send_scores = () => {
    const scores = {
        set_a: set_a_input.value,
        set_b: set_b_input.value,
        point_a: point_a_input.value,
        point_b: point_b_input.value,
        name_a: name_a_input.value,
        name_b: name_b_input.value,
    }

    socket.send(JSON.stringify(scores));
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    send_scores();
});

reset_btn.addEventListener('click', (e) => {
    // set_a_input.value = 0;
    // set_b_input.value = 0;
    point_a_input.value = 0;
    point_b_input.value = 0;
    send_scores();
});

set_a_add.addEventListener('click', (e) => {set_a_input.value = Number(set_a_input.value) + 1});
set_a_remove.addEventListener('click', (e) => {set_a_input.value = Number(set_a_input.value) - 1});
point_a_add.addEventListener('click', (e) => {point_a_input.value = Number(point_a_input.value) + 1});
point_a_remove.addEventListener('click', (e) => {point_a_input.value = Number(point_a_input.value) - 1});

set_b_add.addEventListener('click', (e) => {set_b_input.value = Number(set_b_input.value) + 1});
set_b_remove.addEventListener('click', (e) => {set_b_input.value = Number(set_b_input.value) - 1});
point_b_add.addEventListener('click', (e) => {point_b_input.value = Number(point_b_input.value) + 1});
point_b_remove.addEventListener('click', (e) => {point_b_input.value = Number(point_b_input.value) - 1});