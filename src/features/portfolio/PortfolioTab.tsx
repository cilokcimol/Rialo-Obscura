import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { FLUX_ASSETS } from '../../data/fluxAssets';
import { getActivityHistory, type SwapActivity } from '../../lib/fluxMock';
import { useTokenBalance } from '../../hooks/useTokenBalance';

const PortfolioTab = () => {
    const { address, isConnected } = useAccount();
    const [activities, setActivities] = useState<SwapActivity[]>([]);

    useEffect(() => {
        // Initial load
        setActivities(getActivityHistory());

        // Poll for updates every 2 seconds
        const interval = setInterval(() => {
            setActivities(getActivityHistory());
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const truncateAddress = (addr: string) => {
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    };

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'swap': return '🔄';
            case 'shield': return '🛡️';
            case 'unshield': return '🔓';
            case 'faucet': return '💧';
            default: return '📝';
        }
    };

    if (!isConnected) {
        return (
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div className="cyber-card" style={{ padding: '60px', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔒</div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>CONNECT WALLET</h3>
                    <p style={{ color: 'var(--text-dim)' }}>
                        Connect your wallet to view portfolio
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
                PORTFOLIO
            </h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: '40px', fontFamily: 'JetBrains Mono', fontSize: '0.9rem' }}>
        // ASSET OVERVIEW & ACTIVITY
            </p>

            {/* Wallet Info */}
            <div className="cyber-card" style={{ padding: '25px', marginBottom: '30px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
                    WALLET ADDRESS
                </div>
                <div style={{ fontSize: '1.2rem', fontFamily: 'JetBrains Mono', color: 'var(--neon-cyan)' }}>
                    {truncateAddress(address || '')}
                </div>
            </div>

            {/* Balances */}
            <div style={{ marginBottom: '40px' }}>
                <h3 style={{ color: 'var(--neon-cyan)', marginBottom: '20px', fontSize: '1.3rem' }}>
                    BALANCES
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
                    {FLUX_ASSETS.map(asset => {
                        return <TokenBalanceCard key={asset.symbol} asset={asset} userAddress={address} />;
                    })}
                </div>
            </div>

            {/* Activity History */}
            <div>
                <h3 style={{ color: 'var(--neon-cyan)', marginBottom: '20px', fontSize: '1.3rem' }}>
                    ACTIVITY HISTORY
                </h3>

                {activities.length === 0 ? (
                    <div className="cyber-card" style={{ padding: '40px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '15px', opacity: 0.5 }}>📋</div>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                            No activity yet. Start trading to see your history.
                        </p>
                    </div>
                ) : (
                    <div className="cyber-card" style={{ padding: '30px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {activities.map(activity => (
                                <div
                                    key={activity.id}
                                    style={{
                                        padding: '15px',
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ fontSize: '1.5rem' }}>
                                            {getActivityIcon(activity.type)}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.9rem', marginBottom: '3px' }}>
                                                {activity.description}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'JetBrains Mono' }}>
                                                {formatTimestamp(activity.timestamp)}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{
                                        fontSize: '0.7rem',
                                        padding: '4px 10px',
                                        background: 'rgba(0, 240, 255, 0.1)',
                                        color: 'var(--neon-cyan)',
                                        borderRadius: '8px',
                                        textTransform: 'uppercase',
                                    }}>
                                        {activity.type}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Component for individual token balance card
function TokenBalanceCard({ asset, userAddress }: { asset: typeof FLUX_ASSETS[0], userAddress: string | undefined }) {
    const { formattedBalance } = useTokenBalance(
        asset.deployed ? asset.contractAddress : undefined,
        userAddress
    );

    const balance = asset.deployed ? formattedBalance : (asset.mockBalance || 0);
    const isReal = asset.deployed;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="cyber-card"
            style={{ padding: '20px' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '3px' }}>
                        {asset.symbol}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        {asset.name}
                    </div>
                </div>
                {!isReal && (
                    <span style={{
                        fontSize: '0.65rem',
                        padding: '3px 8px',
                        background: 'rgba(138, 43, 226, 0.2)',
                        color: 'var(--neon-purple)',
                        borderRadius: '8px',
                    }}>
                        DEMO
                    </span>
                )}
            </div>

            <div style={{ fontSize: '1.5rem', fontFamily: 'JetBrains Mono', color: isReal ? 'white' : 'var(--text-dim)' }}>
                {balance.toFixed(4)}
            </div>
        </motion.div>
    );
}

export default PortfolioTab;
