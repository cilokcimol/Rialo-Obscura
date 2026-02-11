import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';

interface AppHeaderProps {
    onFaucetClick?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onFaucetClick }) => {
    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: 'rgba(2, 2, 10, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(0, 240, 255, 0.2)',
            padding: '15px 30px',
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                {/* Left: Branding */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img
                        src="/Logo 2.jpg"
                        alt="Rialo"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: '2px solid var(--neon-cyan)',
                        }}
                    />
                    <h2 className="glow-text" style={{ fontSize: '1.5rem', fontFamily: 'Rajdhani' }}>
                        RIALO OBSCURA
                    </h2>
                </div>

                {/* Right: Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-dim)',
                        fontFamily: 'JetBrains Mono',
                        padding: '6px 12px',
                        background: 'rgba(0, 240, 255, 0.1)',
                        borderRadius: '20px',
                        border: '1px solid var(--neon-cyan)',
                    }}>
                        BASE SEPOLIA
                    </div>

                    {onFaucetClick && (
                        <button
                            className="btn-primary"
                            onClick={onFaucetClick}
                            style={{ fontSize: '0.85rem', padding: '8px 20px' }}
                        >
                            FAUCET
                        </button>
                    )}

                    <ConnectButton />
                </div>
            </div>
        </nav>
    );
};

export default AppHeader;
