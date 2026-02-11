import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import AppHeader from '../components/AppHeader';
import AppTabs, { TabId } from '../components/AppTabs';
import Footer from '../components/Footer';
import SwapTab from '../features/swap/SwapTab';
import StakeTab from '../features/stake/StakeTab';
import PortfolioTab from '../features/portfolio/PortfolioTab';
import MarketsTab from '../features/markets/MarketsTab';
import LiquidityTab from '../features/liquidity/LiquidityTab';
import Dashboard from '../components/Dashboard';
import BackgroundGrid from '../components/BackgroundGrid';

const AppPage = () => {
    const [activeTab, setActiveTab] = useState<TabId>('obscura');
    const faucetRef = useRef<HTMLDivElement>(null);

    const handleFaucetClick = () => {
        setActiveTab('obscura');
        setTimeout(() => {
            faucetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const handleTabChange = (tab: TabId) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'obscura':
                return <Dashboard />;
            case 'swap':
                return <SwapTab />;
            case 'stake':
                return <StakeTab />;
            case 'portfolio':
                return <PortfolioTab />;
            case 'markets':
                return <MarketsTab onSwapClick={() => handleTabChange('swap')} />;
            case 'liquidity':
                return <LiquidityTab />;
            default:
                return null;
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <BackgroundGrid />

            <div style={{ position: 'relative', zIndex: 10 }}>
                <AppHeader onFaucetClick={handleFaucetClick} />

                <div style={{
                    paddingTop: '120px',
                    minHeight: '100vh',
                }}>
                    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
                        <AppTabs activeTab={activeTab} onTabChange={handleTabChange} />

                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderTabContent()}
                        </motion.div>
                    </div>
                    
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AppPage;