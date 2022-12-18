import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { pagitaService } from "../services/pagita.service"
import { AddTest } from "./add-test"
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { uploadService } from "../services/upload.service"
import { savePag } from "../store/actions/pagita.action"
export function PagDetails() {
    const params = useParams()
    const [pag, setPag] = useState()
    const [isAddTest, setIsAddTest] = useState(false)
    const [isTestsOpen, setIsTestsOpen] = useState(false)
    const [isMuneOpen, setIsMuneOpen] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        loadPag()
    }, [params.pagId, pag])

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
    const onUploadImg = async (ev) => {
        console.log('in');
        try {
            const data = await uploadService.uploadImg(ev)
            console.log(data);
            const pagToUpdate = structuredClone(pag)
            if (!pagToUpdate.pictures) pagToUpdate.pictures = []
            pagToUpdate.pictures = [...pagToUpdate.pictures, { title: 'baby', img: data.url }]
            dispatch(savePag(pagToUpdate))
        } catch (err) {
            console.log(err);
        }
    }
    const closeMenu = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        setIsMuneOpen(false)
    }
    if (!pag) return
    return <div className="pag-details">
        <h1>{pag.parentsName}</h1>
        <h2>ת.ז:  {pag.id}</h2>
        <h2>מין:  {pag.gender === 'female' ? 'נקבה' : 'זכר'}</h2>

        <h2>תאריך לידה:  {pag.bornDate ? convertBornTime(pag.bornDate) : 'לא צויין'}</h2>
        <h2>משקל נוכחי :{pag.weight} </h2>
        <div className="toggle-tests" onClick={() => setIsTestsOpen(!isTestsOpen)}><h3>   בדיקות וטיפולים</h3></div>

        <div className={isTestsOpen ? "tests-container open" : "tests-container"}>
            <div className="tests">
                <h3 className="title">בדיקות</h3>
                {pag?.tests && pag?.tests.map(test => {
                    return <div key={test.id} className="test">
                        <div className="test-details-container">
                            <span className="line"> </span>
                            <span className="name-test">{test.name} </span>
                            <div className="date-time">
                                <span className="time-test">{test.time} </span>
                                <span className="date-test">{test.date} </span>
                            </div>
                        </div>
                        <span><ArrowBackIosIcon fontSize="15" /></span>
                    </div>
                })}
            </div>
            <div className="tests">
                <h3 className="title">טיפולים</h3>
                {pag?.treatments && pag?.treatments.map(treatment => {
                    return <div key={treatment.id} className="test">
                        <div className="test-details-container">
                            <span className="line"> </span>
                            <span className="name-test">{treatment.name} </span>
                            <div className="date-time">
                                <span className="time-test">{treatment.time} </span>
                                <span className="date-test">{treatment.date} </span>
                            </div>
                        </div>
                        <span><ArrowBackIosIcon fontSize="15" /></span>

                    </div>
                })}
            </div>
        </div>

        <div className="add-test-button">
            <MoreVertIcon onClick={() => setIsMuneOpen(true)} />
            {isMuneOpen && <div className="menu">
                <h3 onClick={() => {
                    setIsMuneOpen(false)
                    setIsAddTest(true)
                }}>הוסף אירוע </h3>
                <h3  ><input className="input-upload" type="file" onChange={onUploadImg} /> הוסף תמונה </h3>
            </div>}
            <span>
                <Link to='/pagita'>
                    <KeyboardTabIcon fontSize={'large'} />
                </Link>
            </span>
        </div>
        {isAddTest && <AddTest setIsAddTest={setIsAddTest} pag={pag} />}
    </div>
}