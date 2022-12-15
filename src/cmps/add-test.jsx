
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { prefixer } from "stylis"
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from "@emotion/react"
import createCache from '@emotion/cache';
import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"
import { useDispatch } from "react-redux";
import { savePag } from "../store/actions/pagita.action";

export function AddTest({ pag, setIsAddTest }) {
    const [dateForInput, setDateForInput] = useState('')
    const dispatch=useDispatch()
    useEffect(() => {
        setDateForInput(utilService.getDateForInput())


    }, [])

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });
    const theme = createTheme({
        direction: 'rtl', // Both here and <body dir="rtl">
    });
    const cheackInputs = (ev) => {
        ev.preventDefault()
        const name = ev.target[0].value
        const date = ev.target[2].value.split('T')[0]
        const time = ev.target[2].value.split('T')[1]
        console.log('time',time)
        setIsAddTest(false)
        const pagToUpdate = structuredClone(pag)
        pagToUpdate.tests = [...pagToUpdate.tests, { id: utilService.makeId(), date: date, name: name,time:time }]
        dispatch(savePag(pagToUpdate))
    }

    return <div className="add-test">
        <form onSubmit={cheackInputs}>
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <FormControl fullWidth>
                        <TextField className="test-name" name="test-name" id="outlined-basic" dir="rtl" label=" שם הבדיקה" variant="outlined" />
                        <TextField
                            id="datetime-local"
                            className="test-date"
                            name="test-date"
                            type="datetime-local"
                            label="תאריך "
                            defaultValue={dateForInput}
                            sx={{ width: 250 }}

                            InputProps={{ inputProps: { min: 0, max: 12 } }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: '100%' }}
                        />

                    </FormControl>
                </ThemeProvider>
            </CacheProvider>
            <div className="button-container">
            <button onClick={() => setIsAddTest(false)} >ביטול </button>
            <button  >אישור</button>
            </div>
        </form>

    </div>
}