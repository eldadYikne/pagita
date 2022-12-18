import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { prefixer } from "stylis"
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from "@emotion/react"
import createCache from '@emotion/cache';
import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"

export function AddPag({ addPag, setIsAddPag }) {
    const [dateForInput, setDateForInput] = useState('')
    const [value, setValue] = useState('')

    useEffect(() => {
        setDateForInput(utilService.getDateForInput())


    }, [])

    const onChangeHandel = (ev) => {
        ev.preventDefault()
        const elInput = document.querySelector(`.${ev.target.name}`)
        if (!ev.target.value) {
            elInput.classList.add('red')
        } else {
            elInput.classList.remove('red')

        }
    }

    const checkInputs = (ev) => {
        ev.preventDefault()
        const details = ['gender', 'parentsName', 'weight', 'bornDate', 'id', 'tel']
        const gender = ev.target[2].value
        const parentsName = ev.target[0].value
        const weight = ev.target[4].value
        const bornDate = ev.target[6].value
        const id = ev.target[8].value
        const tel = ev.target[10].value
        if (gender && parentsName && weight && bornDate && id && tel) {
            setIsAddPag(false)
            addPag(ev)
        } else {
            details.forEach(option => {
                if (!eval(option)) {
                    const elInput = document.querySelector(`.${option}`)
                    if (!ev.target.value) {
                        elInput.classList.add('red')
                        setTimeout(() => {
                            elInput.classList.remove('red')
                        }, 2000)
                    } else {
                        elInput.classList.remove('red')

                    }
                }
            })
        }
    }
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });
    const theme = createTheme({
        direction: 'rtl', // Both here and <body dir="rtl">
    });

    return <div className="add-pag" dir="rtl">
        <h2 className="title">הוספת תינוק</h2>
        <form onSubmit={checkInputs} onChange={onChangeHandel}  >
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <TextField className="parentsName" name="parentsName" id="outlined-basic" dir="rtl" label="שם האם" variant="outlined" />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">מין</InputLabel>
                        <Select
                            className="gender"
                            name="gender"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="מין"
                            style={{ width: '98%' ,marginRight:5}}
                            defaultValue=""
                        >
                            <MenuItem value='male'>זכר</MenuItem>
                            <MenuItem value='female'>נקבה</MenuItem>
                        </Select>
                        <TextField
                            className="weight" name="weight"
                            id="outlined-basic" dir="rtl"
                            label="משקל" variant="outlined"
                        />
                        <TextField
                            id="datetime-local"
                            className="bornDate"
                            name="bornDate"
                            type="datetime-local"
                            label="תאריך לידה"
                            defaultValue={dateForInput}
                            // "2017-05-24T10:30"
                            sx={{ width: 250 }}
                            InputProps={{ inputProps: { min: 0, max: 12 } }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: '98%' }}
                        />
                        <TextField className="id" name="id"
                            type='tel' id="outlined-basic" dir="rtl"
                            label="ת.ז" variant="outlined" />
                        <TextField className="tel" name="tel"
                            type='tel' id="outlined-basic" dir="rtl"
                            label="נייד" variant="outlined" />
                    </FormControl>
                </ThemeProvider>
            </CacheProvider>
            <div className="buttons-container">
                <button onClick={() => setIsAddPag(false)} >ביטול </button>
                <button >אישור </button>
            </div>
        </form>
    </div>
}