import React, { useState } from 'react';

const API_BASE = "https://your-backend-service.onrender.com";

function App() {
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState('');
  const [spotPrice, setSpotPrice] = useState('');
  const [volatility, setVolatility] = useState('');
  const [unlockDate, setUnlockDate] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/calculate_dlom`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token, amount: Number(amount), spot_price: Number(spotPrice),
        volatility: Number(volatility), unlock_date: unlockDate
      })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <h1>Token Unlock Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Token" value={token} onChange={e => setToken(e.target.value)} /><br />
        <input placeholder="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} /><br />
        <input placeholder="Spot Price" type="number" value={spotPrice} onChange={e => setSpotPrice(e.target.value)} /><br />
        <input placeholder="Volatility" type="number" value={volatility} onChange={e => setVolatility(e.target.value)} /><br />
        <input type="date" value={unlockDate} onChange={e => setUnlockDate(e.target.value)} /><br />
        <button type="submit">Calculate</button>
      </form>
      {result && <div>
        <p>DLOM Discount: ${result.dlom_price}</p>
        <p>Discounted Total Value: ${result.total_value}</p>
      </div>}
    </div>
  );
}

export default App;
