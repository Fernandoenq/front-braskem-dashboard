import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

function Transfer() {
  const [collectPoints, setCollectPoints] = useState([]);
  const [eventDays, setEventDays] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [transfers, setTransfers] = useState([]);
  
  const [senderCollectPointId, setSenderCollectPointId] = useState('');
  const [recipientCollectPointId, setRecipientCollectPointId] = useState('');
  const [senderEventDay, setSenderEventDay] = useState('');
  const [recipientEventDay, setRecipientEventDay] = useState('');
  const [giftId, setGiftId] = useState('');
  const [transferred, setTransferred] = useState('');

  useEffect(() => {
    // Fetch collect points for dropdown 1 and 2
    fetch('http://15.228.224.50:3333/Transfer/CollectPoints')
      .then(response => response.json())
      .then(data => setCollectPoints(data.CollectPoints));

    // Fetch event days for dropdown 3 and 4
    fetch('http://15.228.224.50:3333/Transfer/EventDays')
      .then(response => response.json())
      .then(data => setEventDays(data.EventDays));

    // Fetch gifts for dropdown 5
    fetch('http://15.228.224.50:3333/Transfer/Gifts')
      .then(response => response.json())
      .then(data => setGifts(data.Gifts));

    // Fetch transfers for the table
    fetch('http://15.228.224.50:3333/Transfer/Transfers')
      .then(response => response.json())
      .then(data => setTransfers(data.Transfers));
  }, []);

  const handleTransfer = () => {
    const currentDateTime = new Date().toISOString().replace('T', ' ').replace('Z', '');
    
    const payload = {
      SenderCollectPointId: senderCollectPointId,
      RecipientCollectPointId: recipientCollectPointId,
      SenderEventDay: senderEventDay,
      RecipientEventDay: recipientEventDay,
      GiftId: giftId,
      Transferred: parseInt(transferred, 10),
      TransferDate: currentDateTime,
      OrganizerId: localStorage.getItem('OrganizerId')
    };

    fetch('http://15.228.224.50:3333/Transfer/TransferGifts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => response.json().then(data => ({ status: response.status, data })))
    .then(({ status, data }) => {
      if (status === 200) {
        toast.success('Transferência bem sucedida!');
        // Refresh the table data after successful transfer
        fetch('http://15.228.224.50:3333/Transfer/Transfers')
          .then(response => response.json())
          .then(data => setTransfers(data.Transfers));
      } else if (status === 422) {
        toast.error(data.Errors.join(', '));
      } else {
        toast.error('Algo deu errado. Por favor, tente novamente.');
      }
    })
    .catch(error => {
      toast.error('Erro ao realizar transferência: ' + error.message);
    });
  };

  // Função para formatar a data
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Box 
        display="flex" 
        flexDirection={{ xs: 'column', md: 'row' }} 
        justifyContent="space-between" 
        width="93%" 
        mb={4}
      >
        <TextField
          select
          label="Ponto de Coleta - Remetente"
          style={{width:'95%'}}
          value={senderCollectPointId}
          onChange={(e) => setSenderCollectPointId(e.target.value)}
          fullWidth
          sx={{ mb: { xs: 2, md: 0 }, mx: { md: 1 } } }
        >
          {collectPoints.map(point => (
            <MenuItem key={point.CollectPointId} value={point.CollectPointId}>
              {point.CollectPointIdName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Ponto de Coleta - Destinatário"
          style={{width:'95%'}}
          value={recipientCollectPointId}
          onChange={(e) => setRecipientCollectPointId(e.target.value)}
          fullWidth
          sx={{ mb: { xs: 2, md: 0 }, mx: { md: 1 } }}
        >
          {collectPoints.map(point => (
            <MenuItem key={point.CollectPointId} value={point.CollectPointId}>
              {point.CollectPointIdName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Dia do Evento - Remetente"
          style={{width:'95%'}}
          value={senderEventDay}
          onChange={(e) => setSenderEventDay(e.target.value)}
          fullWidth
          sx={{ mb: { xs: 2, md: 0 }, mx: { md: 1 } }}
        >
          {eventDays.map(day => (
            <MenuItem key={day.EventDay} value={day.EventDay}>
              {formatDate(day.InitialDatetime.split(' ')[0])}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Dia do Evento - Destinatário"
          style={{width:'95%'}}
          value={recipientEventDay}
          onChange={(e) => setRecipientEventDay(e.target.value)}
          fullWidth
          sx={{ mb: { xs: 2, md: 0 }, mx: { md: 1 } }}
        >
          {eventDays.map(day => (
            <MenuItem key={day.EventDay} value={day.EventDay}>
              {formatDate(day.InitialDatetime.split(' ')[0])}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Brinde"
          style={{width:'95%'}}
          value={giftId}
          onChange={(e) => setGiftId(e.target.value)}
          fullWidth
          sx={{ mb: { xs: 2, md: 0 }, mx: { md: 1 } }}
        >
          {gifts.map(gift => (
            <MenuItem key={gift.GiftId} value={gift.GiftId}>
              {gift.GiftName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Quantidade Transferida"
          style={{width:'95%'}}
          type="number"
          value={transferred}
          onChange={(e) => setTransferred(e.target.value)}
          fullWidth
          sx={{ mb: { xs: 2, md: 0 }, mx: { md: 1 } }}
        />

        <Button 
          variant="contained" 
          color="primary" 
          style={{width:'95%'}}
          onClick={handleTransfer}
          fullWidth
          sx={{ mx: { md: 1 } }}
        >
          Realizar Transferência
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ 
    width: { xs: '87%', md: '91%' }, // Definir a largura
    transform: {
      xs: 'translateX(-12px)',  // Mais deslocado para a esquerda em mobile
      md: 'translateX(-1px)',   // Menos deslocado em telas maiores
    },
    maxWidth: '100vw', 
    overflowX: 'auto',
    
  }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Brinde</TableCell>
              <TableCell>Organizador</TableCell>
              <TableCell>Ponto de Coleta - Remetente</TableCell>
              <TableCell>Data de Envio</TableCell>
              <TableCell>Ponto de Coleta - Destinatário</TableCell>
              <TableCell>Data de Recebimento</TableCell>
              <TableCell>Quantidade Transferida</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transfers.map((transfer, index) => (
              <TableRow key={index}>
                <TableCell>{transfer.GiftName}</TableCell>
                <TableCell>{transfer.OrganizerName}</TableCell>
                <TableCell>{transfer.SenderCollectPointName}</TableCell>
                <TableCell>{formatDate(transfer.SenderDate)}</TableCell>
                <TableCell>{transfer.RecipientCollectPointName}</TableCell>
                <TableCell>{formatDate(transfer.RecipientDate)}</TableCell>
                <TableCell>{transfer.Transferred}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ToastContainer />
    </Box>
  );
}

export default Transfer;
