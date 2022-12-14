import { useSelector } from "react-redux"



export function HomePage() {

const user= useSelector(state=>state.userReducer.user)

    return <div className="home">
        <img src="https://s.abcnews.com/images/Health/covid-birthrates-pandemic-pregnancy-03-sh-llr-210327_1616866894517_hpMain_16x9_992.jpg" alt="" className="baby" />

        <div className="home-page">

            <div className="p1">
                <div className="title">
                    <h1>ברוכים הבאים לפגיית ביה"ח ברזילי </h1>
                </div>
                <div className="great">
                    <h2>ברוכים הבאים</h2>
                </div>
                <div className="great1">
                {user? <h2> ברוכה הבאה {user.name}</h2>:
                    <h2 > בכדי לצפות בפרטיכם האישיים התחברו לאתר</h2>}
                </div>
            </div>
        </div>

    </div>
}