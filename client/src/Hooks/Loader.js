import React, { useState } from './node_modules/React'

const DataLoader = (Component) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            const fetcher = await window.fetch('/some/deinnopt')
            const response = await fetcher.json()
            setData(response)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    return isLoading ? <div>Loading</div> : <Component data={data} />
}

export default DataLoader
