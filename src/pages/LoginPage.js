import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://15.228.224.50:3333/Organizer/Login', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Login: username,
          SecretKey: password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();

        if (data.Organizers && data.Organizers.length > 0) {
          const { OrganizerName, OrganizerId } = data.Organizers[0];
          localStorage.setItem('OrganizerName', OrganizerName);
          localStorage.setItem('OrganizerId', OrganizerId);
          toast.success('Login bem sucedido!');
          
          window.location.href = '/dashboard';
        } else {
          toast.error('Dados do organizador não encontrados.');
        }
      } else if (response.status === 422) {
        const data = await response.json();
        toast.error(data.Errors.join(', ')); // Exibe as mensagens de erro específicas
      } else if (response.status === 500) {
        toast.error('Erro no servidor. Por favor, tente novamente mais tarde.');
      } else {
        toast.error('Algo deu errado. Por favor, tente novamente.');
      }
    } catch (error) {
      toast.error('Erro na conexão com o servidor.');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '80vh', padding: '16px' }}
    >
      <Typography variant="h4" gutterBottom>
        Portal do Organizador
      </Typography>
      <TextField
        label="Usuário"
        variant="outlined"
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        sx={{
          maxWidth: '400px',
          width: { xs: '100%', sm: '300px', md: '500px' }, // Ajusta o tamanho conforme os breakpoints
          mr: 2
        }}
      />
      <TextField
        label="Senha"
        type="password"
        variant="outlined"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        sx={{
          maxWidth: '400px',
          width: { xs: '100%', sm: '300px', md: '500px' }, // Ajusta o tamanho conforme os breakpoints
          mr: 2
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{
          marginTop: '16px',
          maxWidth: '400px',
          width: { xs: '100%', sm: '300px', md: '500px' }, // Ajusta o tamanho conforme os breakpoints
          mr: 2
        }}
        fullWidth
      >
        Logar
      </Button>
      <Typography variant="body2" color="textSecondary" sx={{ marginTop: '16px' }}>
        PICBRAND - HOLDING CLUB
      </Typography>
      <ToastContainer />
    </Box>    
  );
}

export default LoginPage;
