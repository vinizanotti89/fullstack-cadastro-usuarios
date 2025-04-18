import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {
    Container,
    Form,
    Input,
    InputLabel,
    Title,
    LockImageContainer,
    CustomP,
    UnlockImageContainer
} from '../../styles';

import DefaultBackground from '../../components/TopBackground';
import { Button, LinkButton } from '../../components/Button';
import AnimationLocked from '../../assets/cadeado-abrindo.gif';
import Locked from '../../assets/cadeado-fechado.png';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [lockStatus, setLockStatus] = useState('');
    const navigate = useNavigate();

    // Efeito para limpar o status do cadeado após a animação
    useEffect(() => {
        if (lockStatus === 'unlocking') {
            const timer = setTimeout(() => {
                navigate('/dashboard');
            }, 2000); // Tempo suficiente para ver a animação

            return () => clearTimeout(timer);
        }
    }, [lockStatus, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLockStatus('');

        // Validar campos
        if (!username || !password) {
            setError('Preencha todos os campos');
            setLockStatus('locked');
            return;
        }

        try {
            console.log('Tentando fazer login com:', { username, password });

            // Fazer chamada à API para verificar credenciais
            const response = await api.post('/login', { username, password });

            console.log('Resposta da API:', response.data);

            // Se chegou aqui, a autenticação foi bem-sucedida
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('currentUser', username);
            setLockStatus('unlocking');
            // O redirecionamento acontecerá após a animação, via useEffect
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Usuário ou senha inválidos');
            setLockStatus('locked');
        }
    };

    return (
        <Container>
            <p style={{ color: '#7978D9', marginBottom: '10px', textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}>BEM VINDO A MAIS UM TRABALHO EM REACT CRIADO POR VINÍCIUS ZANOTTI</p>
            <DefaultBackground />

            {/* Container para as imagens do cadeado */}
            {lockStatus && (
                <>
                    {lockStatus === 'locked' && (
                        <LockImageContainer>
                            <img src={Locked} alt='Cadeado fechado' />
                        </LockImageContainer>
                    )}
                    {lockStatus === 'unlocking' && (
                        <UnlockImageContainer>
                            <img src={AnimationLocked} alt='Cadeado abrindo' />
                        </UnlockImageContainer>
                    )}
                </>
            )}

            <Form onSubmit={handleSubmit}>
                <Title>Login</Title>

                {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

                <div style={{ width: '100%' }}>
                    <InputLabel htmlFor="username">Usuário<span> *</span></InputLabel>
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Nome de usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete='username'
                    />
                </div>

                <div style={{ width: '100%' }}>
                    <InputLabel htmlFor="password">Senha<span> *</span></InputLabel>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete='current-password'
                    />
                </div>

                <Button type="submit">Entrar</Button>

                <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                    <CustomP>Ainda não tem cadastro?</CustomP>
                    <LinkButton to="/register" themeType="diferente">
                        Cadastre-se
                    </LinkButton>
                </div>
            </Form>
        </Container>
    );
}

export default Login;