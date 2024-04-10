import React from "react";
import "./block.css"

const defaultCurrencies = ['RUB', 'USD', 'EUR', 'GBP'];

export default function Block({value, currency, onChangeCurrency, onChangeValue}){
    return (
        <div className="block">
            <ul className="currencies">
                {defaultCurrencies.map((cur)=>{
                    return(
                    <li 
                        key={cur}
                        className={currency === cur ? 'active' : ''}
                        onClick={()=>onChangeCurrency(cur)}>                  
                        {cur}
                    </li>
                    )
                })}
            </ul>

            <input
                onChange={(e)=>onChangeValue(e.target.value)}
                value={value}
                type="number"
                placeholder={0}
            ></input>
        
        </div>
    )
}