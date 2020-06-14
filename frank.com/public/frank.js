// const request = new XMLHttpRequest()
// request.open('GET', 'http://qq.com:8888/friend.js')
// request.onreadystatechange = () => {
//     if (request.readyState === 4 && request.status <= 200) {
//         console.log(request.response)
//     }
// }
// request.send() 
//console.log(window.xxx)
function jsonp(url) {
    return new Promise((resolve, reject) => {
        const random = 'nightlue' + Math.random()
        window[random] = (data) => {
            resolve(data)
        }
        let script = document.createElement('script')
        script.src = `${url}?callback=${random}`
        script.onload = () => {
            script.remove()
        }
        script.onerror = () => {
            reject()
        }
        document.body.appendChild(script)
    })
}
jsonp('http://qq.com:8888/friend.js').then((data) => {
    console.log(data)
})
