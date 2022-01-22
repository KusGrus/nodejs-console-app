function getClosestTag(target, tag) {
    return target.closest(tag)
}

async function remove(id) {
    return await fetch(`/${id}`, {method: 'DELETE'})
}

async function edit(id, body) {
    return await fetch(`/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
}

document.addEventListener('click', async e => {
    if (e.target.dataset.type === 'remove') {
        const parent = getClosestTag(e.target, 'li')
        const id = parent.dataset.id
        await remove(id)
        parent.remove()
    }

    if (e.target.dataset.type === 'edit') {
        const parent = getClosestTag(e.target, 'li')
        const id = parent.dataset.id
        const title = prompt('Enter new title')
        if (title) {
            await edit(id, {title})
            parent.querySelector('span').textContent = title
        }
    }
})

