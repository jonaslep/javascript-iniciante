
// variaveis
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const number = document.querySelector('.numbers');
const list = document.querySelector('.list');

// listas
const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');


let active = 0;
const total = items.length;
let timer;

// functions

const update = (dir) => {

    clearInterval(timer);

    items[active].classList.remove('active');
    dots[active].classList.remove('active');

    active = active + dir;

    if (active === -1) {
        active = total - 1;
    } else if (active === total) {
        active = 0;
    }

    items[active].classList.add('active');
    dots[active].classList.add('active');

    number.innerText = String(active + 1).padStart(2, '0');

    timer = setInterval(() => {
        update(1);
    }, 5000)
}

timer = setInterval(()=> {
    update(1);
},5000)



// listeners 

prevBtn.addEventListener('click', () => {
    update(-1);

})
nextBtn.addEventListener('click', () => {
    update(1)
})