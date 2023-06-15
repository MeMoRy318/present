const postId = new URL(location.href).searchParams.get('id')
const userId = new URL(location.href).searchParams.get('userId')

const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;

const promise = new Promise((resolve, reject) => {

    fetch(url).then(response => {
        if (response.ok) {
            resolve(response.json())
        } else {
            reject(response)
        }
    })

})

promise.then(posts => {

    const cardsWrap = document.getElementById('cards');

    const closePosts = document.getElementById('closePosts');
    closePosts.addEventListener('click',()=>{
        location.href = `../user-details/user-details.html?id=${userId}`
    })

    posts.forEach(value => {
        const {name,email,body} = value;
        const cardsText = document.createElement('div');
        cardsText.classList.add('cards__text');
        cardsText.innerHTML = `<p>${name}</p> <p>${email}</p> <p>${body}</p>`

        cardsWrap.appendChild(cardsText)
    })

})