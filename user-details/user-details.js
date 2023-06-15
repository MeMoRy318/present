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
];

let userId = new URL(location.href).searchParams.get('id');

const urlGetUser = `https://jsonplaceholder.typicode.com/users/${userId}`;
const urlGetPosts = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;

const user = JSON.parse(localStorage.getItem('user'));

const promise = new Promise((resolve, reject) => {
    if (user) {
        resolve(user);
    } else {
        fetch(urlGetUser)
            .then(response => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    reject(response);
                }
            });
    }
});

promise.then(value => {
    const {name, username, email, phone, website, company} = value;
    const userBlock = document.getElementById('user');
    userBlock.innerHTML = `
        <div class="user__card" id="userInfo">
            <div class="users__icon_close">
                <span class="material-symbols-outlined" id="icon_close">close</span>
            </div>
            <div class="users__row">
                <div class="users__img">
                    <img src=${photoArray[value.id - 1]} alt=${value.name}>
                </div>
                <div class="users__body">
                    <h3 class="users__title">about ${name}</h3>
                    <div class="users__text">
                        <p>Also known as ${username}, is a member of ${company.name}. Her email is ${email},
                            The phone number is ${phone} and the company website is ${website}</p>
                        <p>${company.name} is a company that works in the field of ${company.bs}. Their slogan
                            ${company.catchPhrase}</p>
                    </div>
                    <div class="users__btn">
                        <button id="contacts">Contacts</button>
                        <button id="post">Post of current user</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('icon_close').addEventListener('click', () => location.href = '../main/index.html');
    return value;
})

    .then(value => {
        const {phone, email, address: {street, suite, city, zipcode}} = value;

        const userBlock = document.getElementById('user');
        const contacts = document.getElementById('contacts');
        const userInfo = document.getElementById("userInfo");

        const userContact = document.createElement('div');
        userContact.classList.add('user__card', 'hidden');
        userContact.setAttribute('id', 'userContact');

        function buildUserContacts() {
            userInfo.classList.toggle('hidden');
            userContact.innerHTML = `
            <div class="users__icon_close">
                <span class="material-symbols-outlined" id="close">close</span>
            </div>
            <div class="users__row">
                <form name="contact" class="formContact">
                    <div>
                        <label>
                            <input type="text" placeholder="Name">
                        </label>
                        <label>
                            <input type="text" placeholder="Phone">
                        </label>
                    </div>
                    <div style="width: 100%">
                        <label>
                            <textarea name="message" id="message" cols="30" rows="10" placeholder="Message"></textarea>
                        </label>
                    </div>
                    <div style="width: 100%">
                        <label>
                            <input type="text" placeholder="E-mail">
                        </label>
                        <button disabled>SEND</button>
                    </div>
                </form>
                <div class="users__body">
                    <h3 class="users__title">Contact Info</h3>
                    <ul class="users__list">
                        <li>City ${city}</li>
                        <li>Street ${street}</li>
                        <li>Suite ${suite}</li>
                        <li>Zipcode ${zipcode}</li>
                        <li>Phone ${phone}</li>
                        <li>Email ${email}</li>
                    </ul>
                </div>
            </div>
        `;
            userContact.classList.toggle('hidden');
            userBlock.append(userContact);

            document.getElementById('close').addEventListener('click', () => {
                userContact.classList.toggle('hidden');
                userInfo.classList.toggle('hidden');
            });
        }

        contacts.addEventListener('click', buildUserContacts);

        return value.id;
    })


    .then(() => {
        const post = document.getElementById('post');
        const userInfo = document.getElementById("userInfo");

        const div = document.createElement('div');
        div.classList.add('hidden', 'postContend');

        function getPosts() {
            div.innerText = '';
            userInfo.classList.toggle('hidden');
            div.classList.toggle('hidden');

            const promise = new Promise((resolve, reject) => {
                fetch(urlGetPosts).then(response => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        reject(response);
                    }
                });
            });


            promise.then(posts => {
                const userBlock = document.getElementById('user');

                const postsWrap = document.createElement('div');
                postsWrap.classList.add('postsWrap');

                const closeBtn = document.createElement('div');
                closeBtn.classList.add('closeBtn');
                closeBtn.innerHTML = `<span class="material-symbols-outlined" id="closePosts">close</span>`;

                const itemsPerPage = 5;
                let currentPage = 0;

                function displayPosts() {
                    postsWrap.innerHTML = "";

                    const startIndex = currentPage * itemsPerPage;
                    const endIndex = startIndex + itemsPerPage;
                    const currentPosts = posts.slice(startIndex, endIndex);

                    currentPosts.forEach(value => {
                        const postsWrap__block = document.createElement('div');
                        postsWrap__block.classList.add('postsWrap__block');

                        const btnWrap = document.createElement('div');
                        btnWrap.classList.add('btnWrap');

                        const btn = document.createElement('button');
                        btn.addEventListener('click', () => {
                            location.href = `../post-details/post-details.html?id=${value.id}&userId=${value.userId}`
                        })
                        btn.innerText = 'MORE';
                        btnWrap.appendChild(btn);

                        postsWrap__block.innerHTML = `
                        <p>${value.title}</p>
                        <p>${value.body}</p>
                    `;

                        postsWrap__block.appendChild(btnWrap);
                        postsWrap.append(postsWrap__block);
                    });

                    updatePaginationButtons();
                }

                function updatePaginationButtons() {
                    const previousBtn = document.getElementById("previousBtn");
                    const nextBtn = document.getElementById("nextBtn");

                    previousBtn.disabled = currentPage === 0;
                    nextBtn.disabled = currentPage === Math.ceil(posts.length / itemsPerPage) - 1;
                }

                function previousPage() {
                    if (currentPage > 0) {
                        currentPage--;
                        displayPosts();
                    }
                }

                function nextPage() {
                    if (currentPage < Math.ceil(posts.length / itemsPerPage) - 1) {
                        currentPage++;
                        displayPosts();
                    }
                }

                const previousBtn = document.createElement("span");
                previousBtn.id = "previousBtn";
                previousBtn.innerText = "arrow_back_ios";
                previousBtn.classList.add('material-symbols-outlined');
                previousBtn.addEventListener("click", previousPage);

                const nextBtn = document.createElement("span");
                nextBtn.id = "nextBtn";
                nextBtn.innerText = "arrow_forward_ios";
                nextBtn.classList.add('material-symbols-outlined');
                nextBtn.addEventListener("click", nextPage);

                const pagination = document.createElement("div");
                pagination.id = "pagination";
                pagination.append(previousBtn, nextBtn);

                div.append(closeBtn, postsWrap, pagination);
                userBlock.append(div);

                document.getElementById('closePosts')
                    .addEventListener('click', () => {
                        div.classList.toggle('hidden');
                        userInfo.classList.toggle('hidden');
                    });

                displayPosts();
            });

        }

        post.addEventListener('click', getPosts);
    });
