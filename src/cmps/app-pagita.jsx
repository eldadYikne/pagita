import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadPags, savePag } from "../store/actions/pagita.action"
import { PagsList } from "./pags-list"
export function PagitaApp() {

    const { pags } = useSelector(state => state.pagitaModule)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadPags())

    }, [])

    const addPag = (ev) => {
        ev.preventDefault()
        const gender = ev.target[2].value
        const parentsName = ev.target[0].value
        const weight = ev.target[4].value
        const bornDate = ev.target[6].value
        const id = ev.target[8].value
        const tel = ev.target[10].value

        const newPag = { gender, parentsName, weight, bornDate, id, tel }
        dispatch(savePag(newPag))
    }



    console.log('pags', pags)
    return <div className="pagita">
        <PagsList addPag={addPag} pags={pags} />

    </div>
}