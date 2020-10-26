
import React, { useState, useEffect, useContext } from 'react'
import pageApi from '../../../api/searchApi'
import context from './common'

function Artist() {
    const [artistData, setArtistData] = useState([])
    const param = useContext(context)
    useEffect(() => {


        pageApi.query(param).then(res => {
            res.data.result && setArtistData(res.data.result.artists)
        })


        return () => {

        }
    }, [param])


    return (
        <div className='page-artist'>
            {artistData.map((item: artistItem) => {
                return (
                    <div className="artist-item" key={item.id}>
                        <a href={'#/artist?id=' + item.id} title={item.name}>
                            <img src={item.img1v1Url} alt={item.name} width='150' height='150' />
                        </a>

                    </div>
                )
            })}
        </div>
    )
}
interface artistItem {
    name: string
    id: number
    img1v1Url: string
}

export default Artist;