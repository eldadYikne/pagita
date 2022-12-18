import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pagitaService } from '../services/pagita.service';



export function PersonalDetails() {
    const params = useParams()
    const [pag, setPag] = useState()
    useEffect(() => {
        loadPag()
    }, [])

    const loadPag = async () => {
        const id = params.babyId
        try {
            const pag = await pagitaService.getById(id)
            setPag(pag)
            console.log('pag', pag)


        } catch (err) {
            console.log('err', err)
        }
    }

    return <div className="tests-container-personal">
        <div className='personal-head'> </div>
        <div className="tests">
            <h3 className="title">בדיקות</h3>
            {pag?.tests && pag?.tests.map((test, idx) => {
                return <div key={test.id} className={idx % 2 === 0 ? "test" : "test gray"}>
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
            {pag?.treatments && pag?.treatments.map((treatment,idx) => {
                return <div key={treatment.id} className={idx % 2 !== 0 ? "test" : "test gray"}>
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
    </div >
}