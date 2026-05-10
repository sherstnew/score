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
const logo_a_preview = document.querySelector('#logo_a_preview');
const logo_b_preview = document.querySelector('#logo_b_preview');

const submit_btn = document.querySelector('#submit_btn');
const reset_btn = document.querySelector('#reset_btn');

const gameid_input = document.querySelector('#gameid');

const timeout_a_checkbox = document.querySelector('#timeout_a');
const timeout_b_checkbox = document.querySelector('#timeout_b');

const sets_scores = document.querySelectorAll(".set_score");

const socket = new WebSocket("wss://tablo.sherstd.ru/api/");
let send_scores = () => {};

const normalize_point_input = (input) => {
    input.value = Math.max(0, Number(input.value) || 0);
};

const update_logo_preview = (select, preview) => {
    preview.src = './images/teamlogos/' + select.value;
};

update_logo_preview(logo_a_input, logo_a_preview);
update_logo_preview(logo_b_input, logo_b_preview);

logo_a_input.addEventListener('change', () => {
    update_logo_preview(logo_a_input, logo_a_preview);
});

logo_b_input.addEventListener('change', () => {
    update_logo_preview(logo_b_input, logo_b_preview);
});

socket.onopen = () => {
    send_scores = () => {

        submit_btn.style.color = "rgba(255, 255, 255, .5)";

        let sets = [];

        normalize_point_input(point_a_input);
        normalize_point_input(point_b_input);

        sets_scores.forEach(set => {
            const parts = set.querySelectorAll('.set_score_part');
            const score_a = parts[0].value;
            const score_b = parts[1].value;

            if (score_a && score_b && `${score_a}:${score_b}` != "0:0") {
                sets.push(`${score_a}:${score_b}`)
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

    reset_btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            reset_btn.click();
        }
    });
};

set_a_add.addEventListener('click', (e) => {
    set_a_input.value = Number(set_a_input.value) + 1;
    send_scores();
});
set_a_remove.addEventListener('click', (e) => {
    set_a_input.value = Number(set_a_input.value) - 1;
    send_scores();
});
point_a_add.addEventListener('click', (e) => {
    point_a_input.value = Number(point_a_input.value) + 1;
    send_scores();
});
point_a_remove.addEventListener('click', (e) => {
    point_a_input.value = Math.max(0, Number(point_a_input.value) - 1);
    send_scores();
});

set_b_add.addEventListener('click', (e) => {
    set_b_input.value = Number(set_b_input.value) + 1;
    send_scores();
});
set_b_remove.addEventListener('click', (e) => {
    set_b_input.value = Number(set_b_input.value) - 1;
    send_scores();
});
point_b_add.addEventListener('click', (e) => {
    point_b_input.value = Number(point_b_input.value) + 1;
    send_scores();
});
point_b_remove.addEventListener('click', (e) => {
    point_b_input.value = Math.max(0, Number(point_b_input.value) - 1);
    send_scores();
});
