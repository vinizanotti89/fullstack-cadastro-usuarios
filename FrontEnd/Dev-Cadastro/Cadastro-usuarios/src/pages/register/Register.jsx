import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import {
    Container,
    ContainerInputs,
    Form,
    Input,
    InputLabel,
    Title,
} from '../../styles';
import { CelebrationMessage } from './style';

import DefaultBackground from '../../components/TopBackground';
import { Button, LinkButton } from '../../components/Button';
import AvatarSelector from '../../components/AvatarSelector';

function Register() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const navigate = useNavigate();

    // Referências para inputs
    const inputName = useRef();
    const inputAge = useRef();
    const inputEmail = useRef();
    const inputUsername = useRef();
    const inputPassword = useRef();

    // Submissão do cadastro
    async function handleSubmit(e) {
        e.preventDefault();

        if (!name || !age || !email || !username || !password) {
            toast.error('Preencha todos os campos obrigatórios');
            return;
        }

        if (!avatar) {
            toast.error('Por favor, selecione um avatar');
            return;
        }

        try {
            setIsLoading(true);

            await api.post('/usuarios', {
                name,
                age: parseInt(age),
                email,
                username,
                password,
                avatar: avatar,
            });

            toast.success('🎉 Cadastro realizado com sucesso! 🎉');
            setShowCelebration(true);
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });

            // Limpa os dados após 3 segundos e redireciona
            setTimeout(() => {
                setShowCelebration(false);
                navigate('/');
            }, 3000);

            // Resetando o formulário
            setName('');
            setAge('');
            setEmail('');
            setUsername('');
            setPassword('');
            setAvatar('');

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Erro ao cadastrar usuário';
            toast.error(`❌ ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <ToastContainer />
            <DefaultBackground />

            {/* Usando o componente reutilizável de avatar */}
            <AvatarSelector
                selectedAvatar={avatar}
                onSelectAvatar={setAvatar}
                baseSeed={username || 'avatar'}
                showSelected={true}
                showRefreshButton={true}
                title="SELECIONE SEU AVATAR"
                isRequired={true}
            />

            <Form onSubmit={handleSubmit}>
                <Title>Cadastrar Usuário</Title>

                <ContainerInputs>
                    <div>
                        <InputLabel htmlFor="name">Nome<span> *</span></InputLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Nome completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            ref={inputName}
                            required
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="age">Idade<span> *</span></InputLabel>
                        <Input
                            id="age"
                            name="age"
                            type="number"
                            placeholder="Idade"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            ref={inputAge}
                            required
                        />
                    </div>
                </ContainerInputs>

                <div style={{ width: '100%' }}>
                    <InputLabel htmlFor="email">E-mail<span> *</span></InputLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        ref={inputEmail}
                        required
                    />
                </div>

                <ContainerInputs>
                    <div>
                        <InputLabel htmlFor="username">Usuário<span> *</span></InputLabel>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Nome de usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            ref={inputUsername}
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="password">Senha<span> *</span></InputLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            ref={inputPassword}
                            required
                            autoComplete="current-password"
                        />
                    </div>
                </ContainerInputs>

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Cadastrando...' : 'Cadastrar Usuário'}
                </Button>

                {showCelebration && (
                    <CelebrationMessage>
                        🎉 Cadastro realizado com sucesso! 🎉
                    </CelebrationMessage>
                )}

                <div style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
                    <p style={{ color: '#fff', fontSize: '16px', paddingBottom: '15px' }}>Já possui cadastro?</p>
                    <LinkButton to="/" themeType="diferente">
                        Fazer Login
                    </LinkButton>
                </div>
            </Form>
        </Container>
    );
}

export default Register;