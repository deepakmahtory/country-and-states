import axios from "axios";
import { useEffect, useState } from "react";

const Lists = () => {
    const [states, setStates] = useState([]);
    const [changeState, setChangeState] = useState('');
    const [country, setCountry] = useState([]);
    const [changeCountry, setChangeCountry] = useState('');

    useEffect(() => {
        axios.get('https://api.countrystatecity.in/v1/countries', {
            headers: {
                'X-CSCAPI-KEY': import.meta.env.VITE_REACT_APP_PASS_KEY
            }
        })
        .then((res) => {
            console.log(res.data);
            setCountry(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    // states
    useEffect(() => {
        axios.get(`https://api.countrystatecity.in/v1/countries/${changeCountry}/states`, {
            headers: {
                'X-CSCAPI-KEY': import.meta.env.VITE_REACT_APP_PASS_KEY
            }
        })
        .then((res) => {
            console.log(res.data);
            setStates(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [changeCountry])

    const handleCountry = (event) => {
        setChangeCountry(event.target.value)
    }
    console.log(changeCountry);

    const handleState = (event) => {
        setChangeState(event.target.value)
    }
    console.log(changeState);

    return (
        <>
            <h2>Lists</h2>
            <label>Select a Country</label>
            <select name="" id="" value={changeCountry} onChange={handleCountry}>
                <option value="">Select a Country</option>
                {country.map((e) => (
                    <option value={e.iso2} key={e.id}>{e.name}</option>
                ))}
            </select>

            <label>Select State</label>
            <select name="" id="" value={changeState} onChange={handleState}>
                <option value="">Select state</option>
                {states.map((s) => (
                    <option value={s.name} key={s.id}>{s.name}</option>
                ))}
            </select>
        </>
    )
}

export default Lists;
