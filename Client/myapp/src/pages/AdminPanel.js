import React from 'react';
import styled from 'styled-components';
import {
    PageContainer,
    Card,
    SectionTitle,
    Input,
    SecondaryButton
} from '../components/SharedStyles';

const AdminHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
`;

const StatCard = styled(Card)`
    text-align: center;
    padding: 1.5rem;
    border-top: 4px solid var(--secondary);
`;

const StatValue = styled.div`
    font-size: 2rem;
    font-weight: 800;
    color: var(--dark);
`;

const StatLabel = styled.div`
    font-size: 0.9rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 0.5rem;
`;

const DashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

const AnalyticsCard = styled(Card)`
    background: #fff;
`;

const ChartContainer = styled.div`
    height: 300px;
    width: 100%;
    margin-top: 2rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    padding-bottom: 2rem;
    border-bottom: 2px solid #f0f0f0;
    position: relative;
`;

const Bar = styled.div`
    width: 40px;
    background: linear-gradient(to top, var(--secondary), #8efce5);
    border-radius: 8px 8px 0 0;
    height: ${props => props.height || '0%'};
    position: relative;
    transition: all 0.5s ease;

    &:hover {
        filter: brightness(1.1);
        &::after {
            content: '${props => props.value}';
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            font-weight: bold;
            color: var(--dark);
        }
    }
`;

const PieChart = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: conic-gradient(
        var(--primary) 0% 35%, 
        var(--secondary) 35% 70%, 
        var(--accent) 70% 100%
    );
    margin: 2rem auto;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
`;

const Legend = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-top: 2rem;
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #666;

    &::before {
        content: '';
        width: 12px;
        height: 12px;
        border-radius: 3px;
        background: ${props => props.color};
    }
`;

const AdminPanel = () => {
    return (
        <PageContainer>
            <AdminHeader>
                <SectionTitle>Admin Insights</SectionTitle>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Input placeholder="Search metrics..." style={{ width: '250px' }} />
                    <SecondaryButton>Export data</SecondaryButton>
                </div>
            </AdminHeader>

            <StatsGrid>
                <StatCard>
                    <StatValue>1,284</StatValue>
                    <StatLabel>Total Users</StatLabel>
                </StatCard>
                <StatCard style={{ borderTopColor: 'var(--primary)' }}>
                    <StatValue>3,592</StatValue>
                    <StatLabel>Trips Created</StatLabel>
                </StatCard>
                <StatCard style={{ borderTopColor: 'var(--accent)' }}>
                    <StatValue>8.4k</StatValue>
                    <StatLabel>Daily Visits</StatLabel>
                </StatCard>
                <StatCard>
                    <StatValue>$42k</StatValue>
                    <StatLabel>Est. Savings</StatLabel>
                </StatCard>
            </StatsGrid>

            <DashboardLayout>
                <AnalyticsCard>
                    <h3>Trip Creation Trends (Weekly)</h3>
                    <ChartContainer>
                        <Bar height="40%" value="120" />
                        <Bar height="65%" value="195" />
                        <Bar height="50%" value="150" />
                        <Bar height="85%" value="255" />
                        <Bar height="70%" value="210" />
                        <Bar height="95%" value="285" />
                        <Bar height="80%" value="240" />
                    </ChartContainer>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem', color: '#888', fontSize: '0.8rem' }}>
                        <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                    </div>
                </AnalyticsCard>

                <AnalyticsCard>
                    <h3>Demographics</h3>
                    <PieChart />
                    <Legend>
                        <LegendItem color="var(--primary)">Europe (35%)</LegendItem>
                        <LegendItem color="var(--secondary)">Asia (35%)</LegendItem>
                        <LegendItem color="var(--accent)">Americas (30%)</LegendItem>
                    </Legend>
                </AnalyticsCard>
            </DashboardLayout>

            <Card style={{ marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Popular Destinations</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                        { city: 'Paris, France', count: 450, growth: '+12%' },
                        { city: 'Tokyo, Japan', count: 380, growth: '+25%' },
                        { city: 'New York, USA', count: 310, growth: '-5%' },
                        { city: 'Bali, Indonesia', count: 290, growth: '+18%' }
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8f9fa', borderRadius: '10px' }}>
                            <span style={{ fontWeight: '700' }}>{item.city}</span>
                            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem' }}>
                                <span style={{ color: '#666' }}>{item.count} trips</span>
                                <span style={{ color: item.growth.startsWith('+') ? '#2dbba7' : '#ff6b6b', fontWeight: 'bold' }}>{item.growth}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </PageContainer>
    );
};

export default AdminPanel;

