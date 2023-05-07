// Токен: ff079546-db20-4fbb-8f18-2cc7ab32ac96
// Идентификатор группы: plus-cohort-23


const HOST = `https://nomoreparties.co/v1/plus-cohort-23`;
const token = 'ff079546-db20-4fbb-8f18-2cc7ab32ac96';







function mainFetch(path, methodToDo, bodyPart, contType) {
    return fetch(`${HOST}/${path}`, {
        method: methodToDo,
        headers: {
            authorization: `${token}`,
            'Content-Type': null || `${contType}`
        },
        body: null || bodyPart

    }).then((res) => {
        if (res.ok) {
            return res.json(); // возвращаем вызов метода json
        } else {
            return Promise.reject(res.status);
        }
    })
        .catch((reject) => {
            console.error(`failed fetch. Code error:${reject}`)
        })
}


function refreshUserInfo(mod) {
    const body = JSON.stringify({
        name: `${mod.newName}`,
        about: `${mod.newAbout}`
    });
    const contType = mod.contentType
        ;
    return mainFetch("users/me", "PATCH", body, contType)
};
function postCardToServer(mod) {
    const body = JSON.stringify({
        name: `${mod.name}`,
        link: `${mod.link}`
    });
    const contType = mod.contentType

    return mainFetch("cards", "POST", body, contType)
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









export { getCards, getUserInfo, getLikesCount, refreshUserInfo, postCardToServer };