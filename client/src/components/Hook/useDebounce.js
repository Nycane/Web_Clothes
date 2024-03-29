import { useEffect, useState } from 'react';
function useDebounce(delay, value) {
    const [keyword, setKeyword] = useState(value);
    useEffect(() => {
        let timeout = setTimeout(() => {
            setKeyword(value);
        }, delay);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return keyword;
}

export default useDebounce;
