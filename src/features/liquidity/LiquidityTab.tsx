import React from 'react';
import { motion } from 'framer-motion';
import { useAccount, useReadContracts } from 'wagmi';
import { formatUnits } from 'viem';
import { FLUX_ASSETS } from '../../data/fluxAssets';
import { SIMPLE_AMM_ADDRESS, SIMPLE_AMM_ABI } from '../../config/dexConfig';
import { useMultiplePriceFeeds } from '../../hooks/usePriceFeed';

const LiquidityTab: React.FC = () => {
    const { address } = useAccount();

    // Fetch pool reserves for all assets
    const reserveContracts = FLUX_ASSETS
        .filter(a => a.deployed)
        .map(asset => ({
            address: SIMPLE_AMM_ADDRESS,
            abi: SIMPLE_AMM_ABI,
            functionName: 'reserves',
            args: [asset.contractAddress]
        }));

    const { data: reservesData } = useReadContracts({
        contracts: reserveContracts as any
    });

    // Fetch user LP shares for all assets
    const sharesContracts = address ? FLUX_ASSETS
        .filter(a => a.deployed)
        .map(asset => ({
            address: SIMPLE_AMM_ADDRESS,
            abi: SIMPLE_AMM_ABI,
            functionName: 'liquidityShares',
            args: [address, asset.contractAddress]
        })) : [];

    const { data: sharesData } = useReadContracts({
        contracts: sharesContracts as any
    });

    // Fetch real prices for TVL calculation
    const deployedSymbols = FLUX_ASSETS.filter(a => a.deployed).map(a => a.symbol);
    const { prices } = useMultiplePriceFeeds(deployedSymbols);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
                LIQUIDITY POOLS
            </h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: '40px', fontFamily: 'JetBrains Mono', fontSize: '0.9rem' }}>
                // PROVIDE LIQUIDITY & EARN FEES
            </p>

            {/* Pool Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
            }}>
                {FLUX_ASSETS.filter(a => a.deployed).map((asset, index) => {
                    const reserve = reservesData?.[index]?.result as bigint | undefined;
                    const reserveFormatted = reserve ? Number(formatUnits(reserve, 18)) : 0;
                    const price = prices[asset.symbol] || 0;
                    const tvl = reserveFormatted * price;
                    const userShares = sharesData?.[index]?.result as bigint | undefined;
                    const userSharesFormatted = userShares ? Number(formatUnits(userShares, 18)) : 0;

                    return (
                        <motion.div
                            key={asset.symbol}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="cyber-card"
                            style={{ padding: '20px' }}
                        >
                            <div style={{ marginBottom: '15px' }}>
                                <div style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '5px' }}>
                                    {asset.symbol}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                                    {asset.name}
                                </div>
                            </div>

                            <div style={{
                                background: 'rgba(0, 240, 255, 0.05)',
                                padding: '15px',
                                borderRadius: '8px',
                                marginBottom: '15px'
                            }}>
                                <div style={{ marginBottom: '10px' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '3px' }}>
                                        POOL RESERVES
                                    </div>
                                    <div style={{ fontSize: '1.1rem', fontFamily: 'JetBrains Mono' }}>
                                        {reserveFormatted.toLocaleString(undefined, { maximumFractionDigits: 2 })} {asset.symbol}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '3px' }}>
                                        TVL
                                    </div>
                                    <div style={{ fontSize: '1.1rem', fontFamily: 'JetBrains Mono', color: 'var(--neon-cyan)' }}>
                                        ${tvl.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    </div>
                                </div>
                            </div>

                            {address && userSharesFormatted > 0 && (
                                <div style={{
                                    background: 'rgba(0, 255, 136, 0.05)',
                                    border: '1px solid rgba(0, 255, 136, 0.2)',
                                    padding: '12px',
                                    borderRadius: '6px',
                                    marginBottom: '10px'
                                }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--neon-green)', marginBottom: '3px' }}>
                                        YOUR LP SHARES
                                    </div>
                                    <div style={{ fontSize: '1rem', fontFamily: 'JetBrains Mono', color: 'var(--neon-green)' }}>
                                        {userSharesFormatted.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                                    </div>
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    className="btn-primary"
                                    style={{ flex: 1, fontSize: '0.85rem', padding: '10px' }}
                                    disabled
                                >
                                    ADD
                                </button>
                                <button
                                    className="btn-secondary"
                                    style={{ flex: 1, fontSize: '0.85rem', padding: '10px' }}
                                    disabled={!address || userSharesFormatted === 0}
                                >
                                    REMOVE
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div style={{
                padding: '20px',
                background: 'rgba(255, 200, 0, 0.05)',
                border: '1px solid rgba(255, 200, 0, 0.3)',
                borderRadius: '12px',
                fontSize: '0.85rem',
                color: 'var(--text-dim)',
                textAlign: 'center',
            }}>
                ⚠️ Add/Remove liquidity buttons coming soon. For now, use Remix IDE to call <code>addLiquidity()</code> and <code>removeLiquidity()</code> functions directly on the SimpleAMM contract at <code>{SIMPLE_AMM_ADDRESS}</code>
            </div>
        </div>
    );
};

export default LiquidityTab;
