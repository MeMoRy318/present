const baseUrl = 'https://jsonplaceholder.typicode.com/users'
const photoArray = [
    'https://cdn.newsdaily.org.ua/images/11598/11598-70-1541422710-e1541422757307.jpg',
    'https://icdn.lenta.ru/images/2020/12/22/14/20201222142754269/square_320_1d6de3806d700e48f1f2efd9d868c422.jpg',
    'https://i0.wp.com/www.pressfoto.ru/blog/wp-content/uploads/2013/10/How-to-make-a-portrait-photography-1.jpg?resize=600%2C338&ssl=1',
    'https://st.depositphotos.com/1000686/3738/i/600/depositphotos_37383675-stock-photo-portrait-of-a-young-beautiful.jpg',
    'https://bogdo.studio/assets/images/resources/69/biznes_portret_neformalny_muhchina_v-studii_na_temnom_fone.jpg',
    'https://admin-suet.ru/articles//wp-content/uploads/2021/04/3f0b4d0e51604f1dfdebf4198710002f.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbgL0FzeLQ_vU8-2A3nKc_KGAoOgjWUTa-DP6OoeOSi3ZtWHW0zh6sgFKSurR4jobnzAk&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrpjQxzNfybJH1Lk4kjADY_tLyuprKErgfgLyHmbYGmWjpUhhQV8AmjlQAdagdqHELe2w&usqp=CAU',
    'https://aif-s3.aif.ru/images/019/507/eeba36a2a2d37754bab8b462f4262d97.jpg',
    'https://cdn.w2w.com.ua/wp-content/uploads/2022/11/krasivye-kommentarii-k-foto-devushke-100-kommentariev-38e1b1d.jpg'
]

const promise = new Promise((resolve, reject) => {
    fetch(baseUrl).then(response => {
        if (response.ok) {
            resolve(response.json())
        } else {
            reject(response)
        }
    })
})

promise.then(data => {
    const value = data.map((item, index) => ({...item, img: photoArray[index]}))
    const itemsPerPage = 5;
    const totalPages = Math.ceil(value.length / itemsPerPage);

     function displayData(page) {

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPageData = value.slice(startIndex, endIndex);

        const cards = document.getElementsByClassName('cards')[0]
        cards.innerText = ''

        currentPageData.forEach((item) => {
            const div__card = document.createElement('div')
            div__card.classList.add('card')

            const card__row = document.createElement('div')
            card__row.classList.add('card__row')
            div__card.appendChild(card__row)

            const card__img = document.createElement('div')
            card__img.style.backgroundImage = `url(${item.img})`
            card__img.classList.add('card__img')


            const card__info = document.createElement('div')
            card__info.addEventListener('click',()=>{
                location.href = `../user-details/user-details.html?id=${item.id}`
                localStorage.setItem('user',JSON.stringify(item))
            })
            card__info.classList.add('card__info')
            card__row.append(card__img,card__info)

            const p = document.createElement('p')
            p.innerText = `${item.id} ${item.name}`
            card__info.appendChild(p)

            cards.appendChild(div__card)
        });
    }

    displayData(1)

    const previousButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');
    let currentPage = 1;

    previousButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayData(currentPage);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayData(currentPage);
        }
    });
})