
import { useEffect, useState } from "react"
import { Link, Outlet, useParams } from "react-router-dom"
import { utilService } from "../services/util.service"
import { PugPreview } from "./pag-preview"

import { AddPag } from "./add-pag"

export function PagsList({ pags, addPag }) {

    const params = useParams()
    const [time, setTime] = useState()
    const [isAddPag, setIsAddPag] = useState(false)
  

    const isPagDisplay = () => {
        return params.pagId ? 'row' :isAddPag ?'row':'row-reverse'
    }

    useEffect(() => {

        const timer = setInterval(() => {
            const time = utilService.getDate()
            setTime(time)
        }, 10000)

        return () => {
            clearInterval(timer)
        }
    }, [])

   
  
   
    if (!pags) return
    return <div className="admin-pags-details">
        <div className="title">
            <div className="details-admin">
                <div className="main button">
                    <button onClick={() => setIsAddPag(!isAddPag)}>הוסף תינוק</button>
                </div>
                <div className="main pags">
                    <h3>מספר תינוקות בפגייה:  {pags.length} </h3>
                </div>
                <div className="main time">
                    {time}
                </div>
            </div>
        </div>

        <div className="admin-place" style={{ flexDirection: isPagDisplay() }}>
            {isAddPag ?
               <AddPag  setIsAddPag={setIsAddPag} addPag={addPag}/> : <Outlet />}

            <div className="pags-list">
                <div className="pags-title">
                    <div className="mom-id">
                        <h2>שם האם</h2>
                        <h2 className="id">ת.ז</h2>
                    </div>

                    <h2 className="gender">מין</h2>
                </div>
                {pags  && pags.map(pag => {
                    return <Link to={`${pag._id}`} key={pag._id}  >
                        <PugPreview pag={pag} />
                    </Link>
                })}
            </div>

        </div>
    </div >
}