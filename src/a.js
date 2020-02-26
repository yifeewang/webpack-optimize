let btn = document.createElement('button');
let content = '点我12'
btn.innerText = content;
btn.addEventListener('click', function(){
    let p = document.createElement('p');
    p.innerText = 'hello'
    document.body.appendChild(p)
})

export const render = () => {
    document.body.appendChild(btn)
}
export const rerender = () => {
    document.querySelector('button').innerText =content
}