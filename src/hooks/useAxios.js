import axios from 'axios';
import { useState } from 'react';

const useAxios = (config, { manual }) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState();

    const execute = async() => {
        setLoading(true);
        try {
            const res = await axios(config);
            setData(res.data.data);
        } catch (error) {
            const res = error.response;
            if(res) {
                setError(res.data.error || res.data.message || res.data.msg);
            } else {
                setError(error.message);
            }
        }
        setLoading(false);
    };

    if(!manual) execute();

    return [{ data, loading, error }, execute];
};

export default useAxios;