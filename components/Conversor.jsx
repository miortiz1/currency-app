'use client';

import React, { useEffect, useState } from 'react';
import CurrencySelect from './CurrencySelect';

const Conversor = () => {
  const CLP = { isoCode: 'CL', currency: 'CLP' };
  const USD = { isoCode: 'US', currency: 'USD' };
  const [sendingAmount, setSendingAmount] = useState(0);
  const [receivingAmount, setReceivingAmount] = useState(0);
  const [sendingCurrency, setSendingCurrency] = useState(CLP);
  const [receivingCurrency, setReceivingCurrency] = useState(USD);
  const [sendCurrencies, setSendCurrencies] = useState([]);
  const [receiveCurrencies, setReceiveCurrencies] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(0.95);
  const [isManualChange, setIsManualChange] = useState(true);

  const fetchCurrencies = async (direction) => {
    try {
      const setCurrencies = direction === 'send' ? setSendCurrencies : setReceiveCurrencies;
      const currenciesData = await fetch(`http://localhost:3000/api/currencies?direction=${direction}`);
      if (currenciesData.ok) {
        const data = await currenciesData.json();
        setCurrencies(data);
      }
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  };
  
  const fetchRate = async () => {
    try {
      const rateData = await fetch(`http://localhost:3000/api/rate?from=${sendingCurrency.currency}&to=${receivingCurrency.currency}`);
      if (rateData.ok) {
        const data = await rateData.json();
        setExchangeRate(data.rate);
      }
    }
    catch (error) {
      console.error('Error fetching rate:', error);
    }
  };

  const handleSendingAmountChange = (value) => {
    setIsManualChange(true);
    setSendingAmount(Math.round(value * 10000)/10000);
  };

  const handleReceivingAmountChange = (value) => {
    setIsManualChange(false);
    setReceivingAmount(Math.round(value * 10000)/10000);
  };
  
  useEffect(() => {
    fetchCurrencies('send');
    fetchCurrencies('receive');
  }, []);


  useEffect(() => {
    fetchRate();
  }, [sendingCurrency, receivingCurrency]);

  useEffect(() => {
    if (sendingCurrency.isoCode !== 'CL') {
      setReceivingCurrency(CLP);
    }
  }, [sendingCurrency]);

  useEffect(() => {

    if (receivingCurrency.isoCode !== 'CL') {
      setSendingCurrency(CLP);
    }
  }, [receivingCurrency]);

  useEffect(() => {
    if (isManualChange) {
      setReceivingAmount(Math.round((sendingAmount * exchangeRate) * 10000)/10000);
    }
    if (!isManualChange) {
      setSendingAmount(Math.round((sendingAmount / exchangeRate) * 10000)/10000);
    }
  }, [sendingAmount, exchangeRate]);



  return (
    <div className='h-screen flex flex-col items-center justify-center content-center'>
      <h1 className='w-full text-white font-extrabold text-4xl text-center'>Currency Simulator</h1>
      <div className='flex bg-slate-500 md:max-w-[50%] sm:max-w-full flex-wrap m-10'>
        <div className='w-full md:w-1/2 h-[100px] flex'>
          <div className='w-3/4 h-full relative'>
            <div className='absolute top-1 left-1 transform text-white font-extrabold text-l'>Send:</div>
            <input
              type='number'
              value={sendingAmount}
              onChange={(e) => handleSendingAmountChange(e.target.value)}
              className='w-full h-full p-10 bg-transparent text-white font-extrabold text-2xl [--webkit-appearance: none]'
            />
          </div>
          <div className='bg-slate-700 w-1/4 h-full'>
            <CurrencySelect
              options={sendCurrencies}
              selectedOption={sendingCurrency}
              onChange={setSendingCurrency}
            />
          </div>
        </div>
        <div className='w-full md:w-1/2 h-[100px] flex'>
          <div className='w-3/4 h-full relative'>
            <div className='absolute top-1 left-1 transform text-white font-extrabold text-l'>Get:</div>
            <input
              type='number'
              value={receivingAmount}
              onChange={(e) => handleReceivingAmountChange(e.target.value)}
              className='w-full h-full p-10 bg-transparent text-white font-extrabold text-2xl [--webkit-appearance: none]'
            />
          </div>
          <div className='bg-slate-700 w-1/4 h-full'>
            <CurrencySelect
              options={receiveCurrencies}
              selectedOption={receivingCurrency}
              onChange={setReceivingCurrency}
            />
          </div>
        </div>
        <div className='w-full text-white font-extrabold text-2xl'>
        </div>
      </div>
      <p>Exchange Rate: {exchangeRate}</p>
    </div>
  );
};

export default Conversor;
