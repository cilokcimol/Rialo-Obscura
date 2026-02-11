import React, { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { addActivity } from '../lib/fluxMock';

const RIALO_USDC_ADDRESS = '0x191798C747807ae164f2a28fA5DFb5145AcE4b6B';

const MINT_ABI = [
  { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }
];

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const [showEncrypted, setShowEncrypted] = useState(false);
  const [encryptedBalance, setEncryptedBalance] = useState(0);
  const [shieldAmount, setShieldAmount] = useState('');
  const [unshieldAmount, setUnshieldAmount] = useState('');

  const { data: balanceData, refetch } = useReadContract({
    address: RIALO_USDC_ADDRESS,
    abi: MINT_ABI,
    functionName: 'balanceOf',
    args: [address],
    query: { enabled: isConnected }
  });

  const formattedBalance = balanceData ? formatUnits(balanceData, 18) : '0';
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const handleMint = () => {
    writeContract({ address: RIALO_USDC_ADDRESS, abi: MINT_ABI, functionName: 'mint', args: [address, parseUnits('100', 18)] });
    addActivity({ type: 'faucet', description: 'Minted 100 USDO from faucet' });
  };

  const handleShield = () => {
    if (!shieldAmount || isNaN(shieldAmount)) return;
    const amount = parseFloat(shieldAmount);
    writeContract({ address: RIALO_USDC_ADDRESS, abi: MINT_ABI, functionName: 'transfer', args: [address, parseUnits(shieldAmount, 18)] }, {
      onSuccess: () => {
        setTimeout(() => setEncryptedBalance(prev => prev + amount), 5000);
        addActivity({ type: 'shield', description: `Shielded ${amount.toFixed(2)} USDO to encrypted vault` });
        setShieldAmount('');
      }
    });
  };

  const handleUnshield = () => {
    if (!unshieldAmount || isNaN(unshieldAmount)) return;
    const amount = parseFloat(unshieldAmount);
    if (encryptedBalance >= amount) {
      setEncryptedBalance(prev => prev - amount);
      addActivity({ type: 'unshield', description: `Unshielded ${amount.toFixed(2)} USDO from encrypted vault` });
      setUnshieldAmount('');
    }
  };

  const setMaxShield = () => {
    if (formattedBalance) setShieldAmount(formattedBalance);
  };

  const setMaxUnshield = () => {
    if (encryptedBalance) setUnshieldAmount(encryptedBalance.toString());
  };

  if (isConfirmed) { refetch(); }

  if (!isConnected) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="cyber-card" 
          style={{ padding: '60px', textAlign: 'center', maxWidth: '600px', width: '100%', border: '1px dashed var(--text-dim)' }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔒</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '15px', color: 'white' }}>ACCESS RESTRICTED</h2>
          <p style={{ marginBottom: '30px', color: 'var(--text-dim)', fontSize: '1.1rem' }}>
            A SECURE CONNECTION IS REQUIRED TO ACCESS THE ASSET PROTOCOLS.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ConnectButton label="CONNECT TO BASE SEPOLIA" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 60px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: '30px' }}
    >
      <aside className="cyber-card" style={{ height: 'fit-content', padding: '30px 20px' }}>
        <ul style={{ listStyle: 'none' }}>
          <li style={{ 
            padding: '12px 15px', 
            background: 'rgba(0, 240, 255, 0.1)', 
            borderLeft: '4px solid var(--neon-cyan)',
            marginBottom: '10px',
            fontFamily: 'JetBrains Mono',
            color: 'var(--neon-cyan)',
            borderRadius: '0 8px 8px 0',
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}>MY ASSETS</li>
        </ul>
        <div style={{ marginTop: '50px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
           <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>MODE: STEALTH</p>
           <p style={{ fontSize: '0.8rem', color: '#00FF00', marginTop: '5px' }}>● SIGNAL STABLE</p>
        </div>
      </aside>

      <main>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h2 className="glow-text" style={{ fontSize: '2rem', marginBottom: '5px' }}>WELCOME COMMANDER</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>// ASSET COMMAND CENTER</p>
          </div>
          <button className="btn-primary" onClick={handleMint} disabled={isConfirming} style={{ fontSize: '0.9rem', padding: '10px 20px' }}>
            {isConfirming ? 'MINTING...' : 'MINT 100 USDO'}
          </button>
        </div>

        <div style={{ marginBottom: '40px', padding: '30px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h1 style={{ fontSize: '3.5rem', fontFamily: 'JetBrains Mono', marginBottom: '5px' }}>
            ${formattedBalance}
          </h1>
          <p style={{ color: 'var(--text-dim)', fontFamily: 'JetBrains Mono', fontSize: '0.9rem' }}>// TOTAL UNSHIELDED BALANCE</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          
          <div className="cyber-card" style={{ padding: '30px' }}>
            <h3 style={{ color: 'var(--neon-cyan)', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid rgba(0,240,255,0.2)' }}>PUBLIC WALLET</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '45px', height: '45px', background: '#2775CA', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>$</div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>USDO</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Base Sepolia</div>
                </div>
              </div>
              <span style={{ fontSize: '1.4rem', fontFamily: 'JetBrains Mono' }}>{formattedBalance}</span>
            </div>
            
            <div style={{ marginTop: 'auto' }}>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  className="cyber-input" 
                  placeholder="0.00" 
                  value={shieldAmount}
                  onChange={(e) => setShieldAmount(e.target.value)}
                />
                <button 
                  className="btn-max" 
                  onClick={setMaxShield}
                  style={{ color: 'var(--neon-cyan)', borderColor: 'var(--neon-cyan)' }}
                >
                  MAX
                </button>
              </div>
              <button className="btn-primary" style={{ width: '100%' }} onClick={handleShield}>
                SHIELD ASSETS &gt;&gt;
              </button>
            </div>
          </div>

          <div className="cyber-card" style={{ padding: '30px', borderColor: 'var(--neon-purple)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid rgba(138,43,226,0.3)' }}>
              <h3 style={{ color: 'var(--neon-purple)' }}>ENCRYPTED VAULT</h3>
              <button onClick={() => setShowEncrypted(!showEncrypted)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>
                {showEncrypted ? 'HIDE BALANCE' : 'VIEW BALANCE'}
              </button>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '45px', height: '45px', background: 'var(--neon-purple)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>🔒</div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>cUSDC</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Rialo Layer</div>
                </div>
              </div>
              <span style={{ fontSize: '1.4rem', fontFamily: 'JetBrains Mono', color: showEncrypted ? 'white' : 'var(--neon-purple)', textShadow: showEncrypted ? 'none' : '0 0 10px var(--neon-purple)' }}>
                {showEncrypted ? encryptedBalance.toFixed(2) : '******'}
              </span>
            </div>
            
            <div style={{ marginTop: 'auto' }}>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  className="cyber-input" 
                  style={{ borderColor: 'var(--neon-purple)', color: 'var(--neon-purple)' }}
                  placeholder="0.00" 
                  value={unshieldAmount}
                  onChange={(e) => setUnshieldAmount(e.target.value)}
                />
                <button 
                  className="btn-max" 
                  onClick={setMaxUnshield}
                  style={{ color: 'var(--neon-purple)', borderColor: 'var(--neon-purple)' }}
                >
                  MAX
                </button>
              </div>
              <button className="btn-purple" style={{ width: '100%' }} onClick={handleUnshield}>
                &lt;&lt; UNSHIELD ASSETS
              </button>
            </div>
          </div>

        </div>
      </main>
    </motion.div>
  );
};

export default Dashboard;