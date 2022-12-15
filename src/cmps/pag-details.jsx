import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { pagitaService } from "../services/pagita.service"
import { AddTest } from "./add-test"
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
export function PagDetails() {
    const params = useParams()
    const [pag, setPag] = useState()
    const [isAddTest, setIsAddTest] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        loadPag()
    }, [params.pagId])

    const loadPag = async () => {
        const id = params.pagId
        try {
            const pag = await pagitaService.getById(id)
            setPag(pag)
        } catch (err) {
            console.log('err', err)

        }
    }

    const convertBornTime = (time) => {

        const currTime = time.split('')
        const TchartIdx = currTime.findIndex(chart => chart === 'T')
        currTime.splice(TchartIdx, 1, ' ')
        return currTime.join('')
    }

    if (!pag) return
    return <div className="pag-details">
        <h1>{pag.parentsName}</h1>
        <h2>ת.ז:  {pag.id}</h2>
        <h2>מין:  {pag.gender === 'female' ? 'נקבה' : 'זכר'}</h2>

        <h2>תאריך לידה:  {pag.bornDate ? convertBornTime(pag.bornDate) : 'לא צויין'}</h2>
        <h2>משקל נוכחי :{pag.weight} </h2>
        <div className="tests">
            <h3>בדיקות</h3>
            {pag?.tests && pag?.tests.map(test => {
                return <div key={test.id} className="test">
                    <span>{test.name}</span>
                    <span>{test.date}</span>
                    <span>{test.time}</span>
                </div>
            })}
        </div>
        <div className="tests">
            <h3>טיפולים</h3>
            {pag?.treatments && pag?.treatments.map(treatment => {
                return <div key={treatment.id} className="test">
                    <span>{treatment.name}</span>
                    <span>{treatment.date}</span>
                    <span>{treatment.time}</span>
                </div>
            })}
        </div>

        <div className="add-test-button">
            <button onClick={() => setIsAddTest(true)}>הוסף </button>
            <span>
                <Link to='/pagita'>
                    <KeyboardTabIcon fontSize={'large'} />
                </Link>
            </span>
        </div>
        {isAddTest && <AddTest setIsAddTest={setIsAddTest} pag={pag} />}
    </div>
}