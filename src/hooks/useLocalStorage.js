import { useState } from "react"

export const useLocalStorage = (key, defaultValue) => {
    const [storedValue, setStoredValue] = useState(()=>{
        try{
            const value = window.localStorage.getItem(key);

            if(value){
                return JSON.parse(value);
            }else{
                window.localStorage.setItem(key, JSON.stringify(defaultValue));
            }
        }catch(err){
            return defaultValue;
        }
    });

    const setValue = (newValue) => {
        setStoredValue(newValue);
        window.localStorage.setItem(key, JSON.stringify(newValue));
    }

    return [storedValue, setValue];
}