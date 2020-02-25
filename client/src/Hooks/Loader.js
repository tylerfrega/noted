import React, { useState } from 'React'
import Breakfast from './Breakfast' // I utilize breakfast foods as my foo/bar/biz/baz

const DataLoader = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            const fetcher = await window.fetch(/some/deinnopt)
            const response = await fetcher.json()
            setData(response)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    return isLoading ? <div>Loading</div> : <Breakfast data={data} />
}

export default DataLoader
