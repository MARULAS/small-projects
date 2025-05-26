import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [num, setNum] = useState(0);
  const [sonuc, setSonuc] = useState(0);
  const [islem, setIslem] = useState('');
  const [islem2, setIslem2] = useState('');

  const fetchRates = async() =>{
    const response = await axios.get("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=2d79578fa2324fd6ae10fb62c9686f9f");
    return response.data.rates;
  }

  const getUSDtoTRY = async (amount) => {
    const rates = await fetchRates();
    return parseFloat(rates.TRY) * amount;
  };
  
  const getUSDtoEURO = async (amount) => {
    const rates = await fetchRates();
    return parseFloat(rates.EUR) * amount;
  };
  
  const getEUROtoUSD = async (amount) => {
    const usd = await getUSDtoEURO(1); // 1 USD kaç EUR → EUR/USD
    return amount / usd;
  };
  
  const getEUROtoTRY = async (amount) => {
    const usdAmount = await getEUROtoUSD(amount);
    return await getUSDtoTRY(usdAmount);
  };
  
  
  const handleNumberChange = (e) => {
    setNum(e.target.value);
  };

  const handleIslemChange = (e) => {
    const value = e.target.value;
    setIslem(value);
  };
  const handleIslem2Change = (e) => {
    const value = e.target.value;
    setIslem2(value);
  };

  const change = async () => {
    let result = num;
  
    if (islem === 'euro' && islem2 === 'dollar') {
      result = await getEUROtoUSD(num);
    } else if (islem === 'dollar' && islem2 === 'euro') {
      result = await getUSDtoEURO(num);
    } else if (islem === 'dollar' && islem2 === 'try') {
      result = await getUSDtoTRY(num);
    } else if (islem === 'euro' && islem2 === 'try') {
      result = await getEUROtoTRY(num);
    } else if (islem === 'try' && islem2 === 'euro') {
      const val = await getEUROtoTRY(num);
      result = num / val;
    } else if (islem === 'try' && islem2 === 'dollar') {
      const val = await getUSDtoTRY(num);
      result = num / val;
    }
  
    setSonuc(result);
  };


// ...

  useEffect(() => {
    if (islem && islem2 && num) {
      change();
    }
  }, [islem, islem2, num]);

  

  /*// Otomatik işlem yapalım, örnek: sayı * 2 ya da sayı * 3
    
    } */
  
  return (
    <>
      <img src=''></img>
      <h1>CURRENCY EXCHANGE</h1>
      <div className='parent'>
        
      <input
        type="number"
        value={num}
        onChange={handleNumberChange}
        className='input-style'
      />
        <select onChange={handleIslemChange} value={islem}>
        <option value="dollar">dollars</option>
        <option value="euro">euro</option>
        <option value="try">turkish-lira</option>
        </select>
        <p id='equalsign'>=</p>
        <input type="number" className='input-style' value={sonuc} onChange={()=>''}></input>
        <select onChange={handleIslem2Change} value={islem2}>
        <option value="dollar">dollars</option>
        <option value="euro">euro</option>
        <option value="try">turkish-lira</option>
        </select>
      </div>
    </>
  )
}

export default App
