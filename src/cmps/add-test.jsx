
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
    const dispatch = useDispatch()

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
    const checkInputs = (ev) => {
        ev.preventDefault()

        const type = ev.target[0].value
        const name = ev.target[2].value
        const date = ev.target[4].value.split('T')[0]
        const time = ev.target[4].value.split('T')[1]
        console.log('time', time)

        setIsAddTest(false)
        const pagToUpdate = structuredClone(pag)

        if (type === 'test') {
            if (!pagToUpdate.tests) pagToUpdate.tests = []
            pagToUpdate.tests = [...pagToUpdate.tests, { id: utilService.makeId(), date: date, name: name, time: time }]
        } else {
            if (!pagToUpdate.treatments) pagToUpdate.treatments = []
            pagToUpdate.treatments = [...pagToUpdate.treatments, { id: utilService.makeId(), date: date, name: name, time: time }]
        }
        console.log('pagToUpdate', pagToUpdate)

        dispatch(savePag(pagToUpdate))
    }

    return <div className="add-test">
        <form onSubmit={checkInputs}>
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">אירוע</InputLabel>
                        <Select
                            defaultValue=""
                            className="type"
                            name="type"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="אירוע"
                            style={{ width: '100%' }}

                        >
                            <MenuItem  value='treatments'>טיפול</MenuItem>
                            <MenuItem value='test'>בדיקה</MenuItem>
                        </Select>
                        <TextField defaultValue="" style={{ marginTop: '10px' }} className="test-name" name="test-name" id="outlined-basic" dir="rtl" label=" שם הבדיקה" variant="outlined" />
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
                            style={{ width: '100%', marginTop: '10px' }}
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