const handleDragStart = event => {
    let fromBox = JSON.stringify({ id: event.target.id })
    event.dataTransfer.setData('dragContent', fromBox)
}

const handleDrop = event => {
    let fromBox = JSON.parse(event.dataTransfer.getData('dragContent'))
    let toBox = { id: event.target.id }
    swapTasks(fromBox, toBox)
}

const handleDragOver = event => {
    event.preventDefault() // Necessary. Allows us to drop.
    return false
}

const swapTasks = (fromBox, toBox) => {
    let newTasks = [...tasks]
    let fromIndex = -1
    let toIndex = -1

    for (let i = 0; i < newTasks.length; i++) {
        if (i === Number(fromBox.id)) {
            fromIndex = i
        }
        if (i === Number(toBox.id)) {
            toIndex = i
        }
    }

    if (fromIndex !== -1 && toIndex !== -1) {
        let { fromId, ...fromRest } = newTasks[fromIndex]
        let { toId, ...toRest } = newTasks[toIndex]
        newTasks[fromIndex] = { id: fromBox.id, ...toRest }
        newTasks[toIndex] = { id: toBox.id, ...fromRest }

        setTasks([...newTasks])
    }
}
// handleDragStart={handleDragStart}
// handleDrop={handleDrop}
// handleDragOver={handleDragOver}