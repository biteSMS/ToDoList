import './index.less'

if (module.hot) {
    module.hot.accept()
}

//获取当天日期
const getToday = () => `${new Date().getFullYear()}年${new Date().getMonth()}月${new Date().getDate()}日`



//localStorage
const Storage = {
    set: (val) => localStorage.setItem('todos', JSON.stringify(val)),
    get: () => JSON.parse(localStorage.getItem('todos')),
    clearAll: () => localStorage.setItem('todos', '[]')
}

//初始化todos
let todos = []

if (!Storage.get()) Storage.set(todos)

//回车事件
const enterPress = (e) => {
    var e = e || window.event
    if (e.keyCode == 13) {
        todos = Storage.get()
        let obj = {
            date: getToday(),
            content: document.querySelector('input[name="submit"]').value,
            status: false
        }
        todos.push(obj)
        Storage.set(todos)
        document.querySelector('input[name="submit"]').value = ''
        document.querySelector('#todo').click()
        showNum()
    }
}

document.querySelector('input[name="submit"]').addEventListener('keypress', enterPress)

//清除所有
const clearAll = () => {
    if (confirm('确认要删除所有的Todo吗？')) {
        Storage.clearAll()
        document.querySelector('#todo').click()
        showNum()
    }
}

document.querySelector('.clearall').addEventListener('click', clearAll)

//切换按钮,页面渲染
const addOptionsActive = (id) => document.querySelector(id).classList.add('options-active')
const removeOptionsActive = (id) => document.querySelector(id).classList.remove('options-active')

const detailsDiv = `<div class="details">
<div class="left">
    <div class="date"></div>
    <div class="content"></div>
</div>
<div class="right">
    <div class="status">未完成</div>
    <div class="clear">清除</div>
</div>
</div>`

const showTodo = () => {
    todos = Storage.get()
    const frame = () => {
        let newDiv = ``
        for (let i = 0; i < todos.length; i++) {
            newDiv += detailsDiv
        }
        return newDiv
    }
    document.querySelector('.list').innerHTML = frame()

    const insertData = () => {
        for (let i = 0; i < todos.length; i++) {
            document.querySelectorAll('.date')[i].innerText = todos[i].date
            document.querySelectorAll('.content')[i].innerText = todos[i].content
            if (todos[i].status) {
                document.querySelectorAll('.status')[i].innerText = '已完成'
            } else {
                document.querySelectorAll('.status')[i].innerText = '未完成'
            }
        }
    }
    insertData()

    const toggleStatus = () => {
        for (let i = 0; i < todos.length; i++) {
            document.querySelectorAll('.status')[i].addEventListener('click', () => {
                if (!todos[i].status) {
                    document.querySelectorAll('.status')[i].innerText = '已完成'
                    todos[i].status = true
                    Storage.set(todos)
                } else {
                    document.querySelectorAll('.status')[i].innerText = '未完成'
                    todos[i].status = false
                    Storage.set(todos)
                }
                showNum()
            })
        }
    }
    toggleStatus()

    const clear = () => {
        for (let i = 0; i < todos.length; i++) {
            document.querySelectorAll('.clear')[i].addEventListener('click', () => {
                todos.splice(i, 1)
                Storage.set(todos)
                showTodo()
                showNum()
            })
        }
    }
    clear()
}

showTodo()

const todoButton = () => {
    addOptionsActive('#todo')
    removeOptionsActive('#completed')
    removeOptionsActive('#undone')
    showTodo()
}

document.querySelector('#todo').addEventListener('click', todoButton)

const showCompleted = () => {
    todos = Storage.get()
    const frame = () => {
        let newDiv = ``
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].status) {
                newDiv += detailsDiv
            }
        }
        return newDiv
    }
    document.querySelector('.list').innerHTML = frame()

    const insertData = () => {
        let j = 0
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].status) {
                document.querySelectorAll('.date')[j].innerText = todos[i].date
                document.querySelectorAll('.content')[j].innerText = todos[i].content
                document.querySelectorAll('.status')[j].innerText = '已完成'
                j++
            }
        }
    }
    insertData()

    const toggleStatus = () => {
        let j = 0
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].status) {
                document.querySelectorAll('.status')[j].addEventListener('click', () => {
                    todos[i].status = false
                    Storage.set(todos)
                    showCompleted()
                })
                j++
            }
        }
        showNum()
    }
    toggleStatus()

    const clear = () => {
        let j = 0
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].status) {
                document.querySelectorAll('.clear')[j].addEventListener('click', () => {
                    todos.splice(i, 1)
                    Storage.set(todos)
                    showCompleted()
                    showNum()
                })
                j++
            }
        }
    }
    clear()
}

const completedButton = () => {
    addOptionsActive('#completed')
    removeOptionsActive('#todo')
    removeOptionsActive('#undone')
    showCompleted()
}

document.querySelector('#completed').addEventListener('click', completedButton)

const showUndone = () => {
    todos = Storage.get()
    const frame = () => {
        let newDiv = ``
        for (let i = 0; i < todos.length; i++) {
            if (!todos[i].status) {
                newDiv += detailsDiv
            }
        }
        return newDiv
    }
    document.querySelector('.list').innerHTML = frame()

    const insertData = () => {
        let j = 0
        for (let i = 0; i < todos.length; i++) {
            if (!todos[i].status) {
                document.querySelectorAll('.date')[j].innerText = todos[i].date
                document.querySelectorAll('.content')[j].innerText = todos[i].content
                document.querySelectorAll('.status')[j].innerText = '未完成'
                j++
            }
        }
    }
    insertData()

    const toggleStatus = () => {
        let j = 0
        for (let i = 0; i < todos.length; i++) {
            if (!todos[i].status) {
                document.querySelectorAll('.status')[j].addEventListener('click', () => {
                    todos[i].status = true
                    Storage.set(todos)
                    showUndone()
                })
                j++
            }
        }
        showNum()
    }
    toggleStatus()

    const clear = () => {
        let j = 0
        for (let i = 0; i < todos.length; i++) {
            if (!todos[i].status) {
                document.querySelectorAll('.clear')[j].addEventListener('click', () => {
                    todos.splice(i, 1)
                    Storage.set(todos)
                    showUndone()
                    showNum()
                })
                j++
            }
        }
    }
    clear()
}

const undoneButton = () => {
    addOptionsActive('#undone')
    removeOptionsActive('#todo')
    removeOptionsActive('#completed')
    showUndone()
}

document.querySelector('#undone').addEventListener('click', undoneButton)

//展示数量
const showNum = () => {
    todos = Storage.get()
    document.querySelector('#todo span').innerText = todos.length
    let j = 0
    let k = 0
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].status) {
            j++
        }
        else {
            k++
        }
    }
    document.querySelector('#completed span').innerText = j
    document.querySelector('#undone span').innerText = k
}

showNum()