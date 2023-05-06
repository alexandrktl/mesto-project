// Токен: ff079546-db20-4fbb-8f18-2cc7ab32ac96
// Идентификатор группы: plus-cohort-23


const HOST = `https://nomoreparties.co/v1/plus-cohort-23`;
const token = 'ff079546-db20-4fbb-8f18-2cc7ab32ac96';







function mainFetch(path, methodToDo) {
    return fetch(`${HOST}/${path}`, {
        method: methodToDo,
        headers: {
            authorization: `${token}`,
        },
        // body: JSON.stringify({
        //     name: '',
        //     about: ''
        //   })
    }).then((res) => {
        if (res.ok) {
            return res.json(); // возвращаем вызов метода json
        }else{
            return Promise.reject(res.status);
        }

    })

    .catch((reject)=>{
        console.error(`failed fetch. Code error:${reject}`)
    })
}







function getCards() {
    return mainFetch("cards", "GET")
};

function getUserInfo() {
    return mainFetch("users/me", "GET")
};
function getLikesCount() {
    return mainFetch("likes", "GET")
};

// function refreshUserInfo() {
//     return mainFetch("users/me", "PATCH",)
// };






export { getCards, getUserInfo,getLikesCount };