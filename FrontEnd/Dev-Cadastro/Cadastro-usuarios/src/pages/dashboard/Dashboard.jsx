import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Container,
    Form,
    Title,
    UserName,
    CustomH3,
    CustomH4,
    CustomP,
    AvatarUser
} from '../../styles';

import DefaultBackground from '../../components/TopBackground';
import Button from '../../components/Button';
import AvatarSelector from '../../components/AvatarSelector';

// Componente Modal para seleção de avatar
function AvatarModal({ isOpen, onClose, selectedAvatar, onSelect, onUpdate, baseSeed }) {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: '#1e1e1e',
                borderRadius: '8px',
                padding: '20px',
                maxWidth: '90%',
                width: '500px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
                position: 'relative'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        color: '#7978D9',
                        fontSize: '24px',
                        cursor: 'pointer'
                    }}
                >
                    ✕
                </button>

                <h3 style={{ color: '#fff', marginBottom: '20px', textAlign: 'center' }}>
                    Escolha seu novo avatar
                </h3>

                <AvatarSelector
                    selectedAvatar={selectedAvatar}
                    onSelectAvatar={onSelect}
                    baseSeed={baseSeed}
                    title="ESCOLHA SEU NOVO AVATAR"
                    containerStyle={{ maxWidth: '100%' }}
                    isRequired={false}
                />

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '15px'
                }}>
                    <Button onClick={onUpdate} style={{ width: '100%' }}>
                        ✅ Atualizar Avatar
                    </Button>
                </div>
            </div>
        </div>
    );
}

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [loggedUser, setLoggedUser] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/usuarios/');
                setUsers(response.data);

                const currentUsername = localStorage.getItem('currentUser');
                if (currentUsername) {
                    const current = response.data.find(user => user.username === currentUsername);
                    setLoggedUser(current);
                    setSelectedAvatar(current?.avatar || '');
                }
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    const updateAvatar = async () => {
        try {
            await api.put(`/usuarios/${loggedUser.id}`, {
                ...loggedUser,
                avatar: selectedAvatar,
            });

            setLoggedUser(prev => ({ ...prev, avatar: selectedAvatar }));

            // Atualizar na lista de usuários também
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === loggedUser.id
                        ? { ...user, avatar: selectedAvatar }
                        : user
                )
            );

            toast.success('Avatar atualizado com sucesso!');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Erro ao atualizar o avatar:', error);
            toast.error('Erro ao atualizar o avatar!');
        }
    };

    return (
        <Container>
            <DefaultBackground />
            <ToastContainer />

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '90%',
                padding: '10px 20px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                }}>
                    {loggedUser && (
                        <div
                            onClick={() => setIsModalOpen(true)}
                            style={{ cursor: 'pointer', position: 'relative' }}
                        >
                            <AvatarUser
                                src={loggedUser.avatar || 'https://seu-avatar-padrao.com/avatar-default.png'}
                                alt="Avatar do usuário"
                                style={{
                                    margin: 0,
                                    transition: 'transform 0.2s',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    right: '-5px',
                                    backgroundColor: '#7978D9',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    border: '2px solid #1e1e1e'
                                }}
                            >
                                ✏️
                            </div>
                        </div>
                    )}
                    <CustomH3>
                        Bem-vindo, <UserName>{loggedUser ? loggedUser.name : 'Usuário'}</UserName>
                    </CustomH3>
                </div>
                <Button onClick={handleLogout} style={{ width: 'auto' }}>Sair</Button>
            </div>

            <Form style={{ marginTop: '40px' }}>
                <Title>Usuários Cadastrados ({users.length})</Title>

                {users.length === 0 ? (
                    <CustomP>Nenhum usuário cadastrado ainda.</CustomP>
                ) : (
                    <div style={{ width: '100%' }}>
                        {users.map((user, index) => {
                            const avatarUrl = user.avatar || 'https://seu-avatar-padrao.com/avatar-default.png';

                            return (
                                <div key={index} style={{
                                    margin: '10px 0',
                                    padding: '15px',
                                    borderRadius: '5px',
                                    backgroundColor: 'rgba(30, 30, 30, 0.8)',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px'
                                }}>
                                    <AvatarUser
                                        src={avatarUrl}
                                        alt={`Avatar de ${user.name}`}
                                        style={{ margin: 0 }}
                                    />
                                    <div>
                                        <CustomH4>{user.name} ({user.age} anos)</CustomH4>
                                        <CustomP>Email: {user.email}</CustomP>
                                        <UserName>Usuário: {user.username}</UserName>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Form>

            {/* Modal para seleção de avatar */}
            <AvatarModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedAvatar={selectedAvatar}
                onSelect={setSelectedAvatar}
                onUpdate={updateAvatar}
                baseSeed={loggedUser?.username || 'user'}
            />
        </Container>
    );
}

export default Dashboard;