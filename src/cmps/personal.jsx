import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { importantFacts } from "../const/pagita";
import { getPagByUsername } from "../store/actions/pagita.action";
import { PagDetails } from "./pag-details";

export function Personal() {

    const pag = useSelector(state => state.pagitaModule.pag)
    const user = useSelector(state => state.userReducer.user)
    const [fact, setFact] = useState(importantFacts[0])
    const [factInterval, setFactInterval] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        if (user) {
            dispatch(getPagByUsername())
        }
        factsBox()
        return () => {
            clearInterval(factInterval)
        }
    }, [])

    const factsBox = () => {
        let counter = 1
        const factInterval = setInterval(() => {
            setFact(importantFacts[counter])
            counter++
            if (counter === importantFacts.length) {
                counter = 1
            }
        }, 10000)
        setFactInterval(factInterval)
    }

    if (!pag) return <div className="no-user">
        <h1>עליך להתחבר על מנת להכנס לאיזור האישי</h1>
    </div>

    return <div className="personal">
        <div className="great">
            <h1> ברוכים השבים, {user.name} </h1>
            <h2> ליווי תינוקך בתהליך משפיע רבות על הצלחת התהליך</h2>
        </div>

        <div className="main">


            <div className="important-facts">
                <h2>חשוב לדעת</h2>
                <p className="fact" >
                    {fact}
                </p>
            </div>
            <div className="baby-details">
                <span> נולדתי בתאריך : {pag.bornDate}</span><br />
                <span> תעודת הזהות שלי : {pag.id}</span>
                <span> המשקל שלי : {pag.weight}</span>

                <div className="tests">
                    <h3> : הבדיקות הקרובות שלי</h3>
                    {pag?.tests && pag?.tests.map(test => {
                        return <div key={test.id} className="test">
                            <span>{test.name}- </span>
                            <span>{test.date} בשעה </span>
                            <span>{test.time}</span>
                        </div>
                    })}
                </div>
                <div className="tests">
                <h3> : הטיפולים הקרובות שלי</h3>

                    {pag?.treatments && pag?.treatments.map(treatment => {
                        return <div key={treatment.id} className="test">
                            <span>{treatment.name}- </span>
                            <span>{treatment.date} בשעה </span>
                            <span>{treatment.time}</span>
                        </div>
                    })}
                </div>
            </div>

        </div>
    </div>
}