import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 1000px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 20px;
    border: 1px solid #000;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    border-bottom: 2px solid #000;
    padding-bottom: 1rem;
`;

const Title = styled.h2`
    font-size: 1.5rem;
`;

const SearchBarContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #000;
    border-radius: 8px;
    font-size: 1rem;
`;

const FilterButton = styled.button`
    padding: 0.8rem 1.5rem;
    background: #fff;
    border: 1px solid #000;
    border-radius: 8px;
    cursor: pointer;
    &:hover { background: #f9f9f9; }
`;

const TabsContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    overflow-x: auto;
`;

const TabButton = styled.button`
    padding: 0.8rem 1.5rem;
    background: #fff;
    border: 1px solid #000;
    border-radius: 20px;
    white-space: nowrap;
    cursor: pointer;
    font-weight: 500;
    
    &:hover, &.active {
        background: #f0f0f0;
        font-weight: bold;
    }
`;

const DashboardBoard = styled.div`
    background: #f0f0f0;
    border-radius: 30px;
    padding: 2rem;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

// Simple CSS shapes to mimic charts without a library
const ChartRow = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
`;

const PieChart = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: conic-gradient(
        #4caf50 0% 25%, 
        #2196f3 25% 60%, 
        #ff9800 60% 100%
    );
    position: relative;
    border: 2px solid #fff;
`;

const ListMock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ListItem = styled.div`
    width: 200px;
    height: 20px;
    background: #bbb;
    border-radius: 4px;
`;

const LineChartMock = styled.div`
    width: 100%;
    height: 150px;
    border-left: 2px solid #999;
    border-bottom: 2px solid #999;
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    padding-bottom: 5px;

    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 10%;
        right: 10%;
        height: 2px;
        background: #d32f2f;
        transform: rotate(-10deg); /* Crude line simulation */
    }
`;

const Dot = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #d32f2f;
    z-index: 1;
`;

const BarChartMock = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 1rem;
    height: 150px;
`;

const Bar = styled.div`
    width: 40px;
    background: #ffab91;
    border-radius: 4px 4px 0 0;
`;

const AdminPanel = () => {
    return (
        <Container>
            <Header>
                <Title>GlobalTrotter</Title>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #000' }}></div>
            </Header>

            <SearchBarContainer>
                <SearchInput placeholder="Search bar ......" />
                <FilterButton>Group by</FilterButton>
                <FilterButton>Filter</FilterButton>
                <FilterButton>Sort by...</FilterButton>
            </SearchBarContainer>

            <TabsContainer>
                <TabButton>Manage Users</TabButton>
                <TabButton>Popular cities</TabButton>
                <TabButton>Popular Activites</TabButton>
                <TabButton className="active">User Trends and Analytics</TabButton>
            </TabsContainer>

            <DashboardBoard>
                <ChartRow>
                    <ListMock>
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#777' }}></div>
                        <ListItem />
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#777' }}></div>
                        <ListItem />
                    </ListMock>
                    <PieChart />
                </ChartRow>

                <ChartRow>
                    <LineChartMock>
                        <Dot style={{ marginBottom: '20px' }} />
                        <Dot style={{ marginBottom: '40px' }} />
                        <Dot style={{ marginBottom: '30px' }} />
                        <Dot style={{ marginBottom: '60px' }} />
                        <Dot style={{ marginBottom: '50px' }} />
                    </LineChartMock>
                </ChartRow>

                <ChartRow style={{ alignItems: 'flex-end' }}>
                    <BarChartMock>
                        <Bar style={{ height: '60%' }} />
                        <Bar style={{ height: '80%' }} />
                        <Bar style={{ height: '100%' }} />
                    </BarChartMock>

                    <ListMock>
                        <ListItem style={{ background: '#777', width: '250px', height: '30px' }} />
                        <ListItem style={{ width: '250px' }} />
                        <ListItem style={{ width: '250px' }} />
                        <ListItem style={{ width: '250px' }} />
                    </ListMock>
                </ChartRow>
            </DashboardBoard>
        </Container>
    );
};

export default AdminPanel;
