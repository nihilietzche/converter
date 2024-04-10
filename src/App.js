import './App.css';
import React from 'react';
import Block from './block.js';

function App() {

  const q = '12'
  const [fromCurrency, setFromCurrency] = React.useState('RUB')
  const [toCurrency, setToCurrency] = React.useState('USD')
  const [fromPrice, setFromPrice] = React.useState(0)
  const [toPrice, setToPrice] = React.useState(1)

  const valutes = React.useRef({})

  //valutes = 
  
  //const [valutes, setValutes] = React.useState()
  console.log(valutes)

  React.useEffect(()=>{
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then((res)=>res.json())
    .then((json)=>{
      valutes.current = ({
        ...json.Valute,
        RUB: {Value: 1}
      });
      onChangeToPrice(1, 'USD');
    }).catch((err)=>console.log(err));
  }, []);

  

  const onChangeFromPrice = (value, cur) => {
    const price = value / valutes.current[toCurrency].Value
    const result = price * valutes.current[cur ?? fromCurrency].Value
    setFromPrice(value)
    setToPrice(result.toFixed(3))
  }
  const onChangeToPrice = (value, cur) => {
    const price = value / valutes.current[fromCurrency].Value
    const result = price * valutes.current[cur ?? toCurrency].Value
    setToPrice(value)
    setFromPrice(result.toFixed(3))
  }

  const onChangeFromCurrency = (cur) => {
    setFromCurrency(cur)
    onChangeFromPrice(fromPrice, cur)
  }

  const onChangeToCurrency = (cur) => {
    setToCurrency(cur)
    onChangeToPrice(toPrice, cur)
  }
  // use reduce 
  // React.useEffect(() => {
  //   console.log(valutes.current)
  //   console.log(fromPrice, toPrice, fromCurrency, toCurrency, valutes.current);
  //   onChangeFromPrice(fromPrice)
  // }, [fromCurrency])

  // React.useEffect(() => {
  //   console.log(toPrice);
  //   onChangeToPrice(toPrice)
  // }, [toCurrency])


  return (
    <div className="App">
      <div className='wrapper'>
        <Block 
          value ={fromPrice}
          currency = {fromCurrency}
          onChangeCurrency={onChangeFromCurrency}
          onChangeValue={onChangeFromPrice}
        />
        <Block
          value ={toPrice}
          currency = {toCurrency}
          onChangeCurrency={ onChangeToCurrency }
          onChangeValue={onChangeToPrice}
        />
      </div>
    </div>
  );
}

export default App;
