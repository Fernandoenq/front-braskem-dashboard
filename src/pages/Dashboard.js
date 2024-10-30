import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Button, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import DayPage from './DayPage';
import './styles.css';

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData] = useState(null);
  const [collectPointData, setCollectPointData] = useState(null);
  const [accumulatedResidueData, setAccumulatedResidueData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallScreen = useMediaQuery('(max-width:1000px)');
  const isVerySmallScreen = useMediaQuery('(max-width:400px)'); // Verificação para telas menores que 400px

  const days = [
    { name: '11/09 Qua', eventDay: 0 },
    { name: '13/09 Sex', eventDay: 1 },
    { name: '14/09 Sáb', eventDay: 2 },
    { name: '15/09 Dom', eventDay: 3 },
    { name: '19/09 Qui', eventDay: 4 },
    { name: '20/09 Sex', eventDay: 5 },
    { name: '21/09 Sáb', eventDay: 6 },
    { name: '22/09 Dom', eventDay: 7 }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const giftsResponse = await fetch(
          `http://15.228.224.50:3333/Dashboard/GetGiftsAmountByRoulette/${days[selectedTab].eventDay}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!giftsResponse.ok) {
          const errorData = await giftsResponse.json();
          throw new Error('Network response was not ok ' + giftsResponse.statusText + ': ' + JSON.stringify(errorData));
        }

        const dayGiftsData = await giftsResponse.json();
        setData(dayGiftsData);

        const collectPointResponse = await fetch(
          `http://15.228.224.50:3333/Dashboard/GiftAmountByCollectPoint/${days[selectedTab].eventDay}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!collectPointResponse.ok) {
          const errorData = await collectPointResponse.json();
          throw new Error('Network response was not ok ' + collectPointResponse.statusText + ': ' + JSON.stringify(errorData));
        }

        const dayCollectPointData = await collectPointResponse.json();
        setCollectPointData(dayCollectPointData);

        const residueResponse = await fetch(
          `http://15.228.224.50:3333/Dashboard/AccumulatedResidue/${days[selectedTab].eventDay}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!residueResponse.ok) {
          const errorData = await residueResponse.json();
          throw new Error('Network response was not ok ' + residueResponse.statusText + ': ' + JSON.stringify(errorData));
        }

        const dayResidueData = await residueResponse.json();
        setAccumulatedResidueData(dayResidueData);

      } catch (error) {
        console.error("Houve um erro ao buscar os dados!", error);
      }
    };

    fetchData();
  }, [selectedTab]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (index) => {
    setAnchorEl(null);
    if (index !== null) {
      setSelectedTab(index);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch('http://15.228.224.50:3333/Award/PredefinedAward', {
        method: 'GET',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'planilha_predefinida.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.error('Erro ao baixar o arquivo:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao realizar a solicitação:', error);
    }
  };

  return (
    <div className='container' style={{
      paddingLeft: isMobile ? '8px' : '20px',  // Define o padding para telas mobile e maiores
      paddingRight: isMobile ? '12px' : '20px', // Define o padding para telas mobile e maiores
      
     
    }}>
      <Box
  sx={{
    display: 'flex',
    justifyContent: isMobile ? 'flex-start' : isTablet ? 'flex-start' : 'flex-end', // Alinha à esquerda para telas tablet
    gap: 2,
    mt: 2,
    mb: 4,
    mr: isMobile ? 10 : 10,
    px: isMobile ? 1 : isTablet ? 2 : 4,
  }}
>
  <Button
    variant="contained"
    href="/transfer"
    sx={{
      backgroundColor: '#F9AC02',
      color: '#fff',
      '&:hover': { backgroundColor: '#d99001' },
      fontSize: isVerySmallScreen ? '0.65rem' : isMobile || isTablet ? '0.75rem' : '0.85rem', // Ajuste da fonte
      padding: isVerySmallScreen
        ? '0.25rem 0.65rem'
        : isMobile || isTablet
        ? '0.35rem 0.85rem'
        : '0.5rem 1rem', // Ajuste do padding
      minWidth: isMobile || isTablet ? '150px' : '140px',
      maxWidth: '200px',
      height: isVerySmallScreen ? '36px' : isMobile || isTablet ? '40px' : '46px', // Ajuste da altura
    }}
    className='transfere'
  >
    Transferência
  </Button>

  <Button
    variant="contained"
    onClick={handleDownload}
    sx={{
      backgroundColor: '#F9AC02',
      color: '#fff',
      '&:hover': { backgroundColor: '#d99001' },
      fontSize: isVerySmallScreen ? '0.65rem' : isMobile || isTablet ? '0.75rem' : '0.85rem', // Ajuste da fonte
      padding: isVerySmallScreen
        ? '0.25rem 0.65rem'
        : isMobile || isTablet
        ? '0.35rem 0.85rem'
        : '0.5rem 1rem', // Ajuste do padding
      minWidth: isMobile || isTablet ? '150px' : '140px',
      maxWidth: '200px',
      height: isVerySmallScreen ? '36px' : isMobile || isTablet ? '40px' : '46px', // Ajuste da altura
    }}
    className='baixar'
  >
    Baixar Planilha Predefinida
  </Button>
</Box>


      <Box>
        {isSmallScreen ? ( 
          <>
            <Button
              variant="contained"
              onClick={handleMenuOpen}
              sx={{
                ml: 1,
                
              }}
            >
              {days[selectedTab].name}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleMenuClose(null)}
            >
              {days.map((day, index) => (
                <MenuItem key={index} onClick={() => handleMenuClose(index)}>
                  {day.name}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Tabs value={selectedTab} onChange={handleChange} aria-label="Dashboard Tabs" >
            {days.map((day, index) => (
              <Tab key={index} label={day.name} />
            ))}
          </Tabs>
        )}

        <Box mt={3} 
        style={{
          marginLeft: isMobile ? '8px' : '5px',  // Define o padding para telas mobile e maiores
        }}
        
        
        >
          <DayPage
            data={data}
            collectPointData={collectPointData}
            accumulatedResidueData={accumulatedResidueData}
            dayName={days[selectedTab].name}
          />
        </Box>
      </Box>
    </div>
  );
}

export default Dashboard;
