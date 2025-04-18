import React, { useState, useEffect } from 'react';
import Button from '../Button';

// Componente reutilizável para seleção de avatares
function AvatarSelector({
    selectedAvatar,
    onSelectAvatar,
    baseSeed = 'user',
    showSelected = true,
    showRefreshButton = true,
    title = "SELECIONE SEU AVATAR",
    containerStyle = {},
    isRequired = true
}) {
    const [avatarOptions, setAvatarOptions] = useState([]);

    // Função para gerar opções de avatar
    const generateAvatarOptions = (base = baseSeed) => {
        const seeds = Array.from({ length: 28 }, (_, i) =>
            `${base}-${Math.floor(Math.random() * 10000)}`
        );
        return seeds.map(seed => ({
            url: `https://api.dicebear.com/6.x/adventurer/svg?seed=${seed}`,
            alt: `Avatar ${seed}`
        }));
    };

    // Carrega os avatares ao iniciar o componente
    useEffect(() => {
        setAvatarOptions(generateAvatarOptions());
    }, [baseSeed]);

    // Função para atualizar os avatares
    const handleRefreshAvatars = () => {
        setAvatarOptions(generateAvatarOptions());
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: '900px',
            backgroundColor: 'rgba(78, 77, 77, 0.8)',
            borderRadius: '25px',
            padding: '10px',
            marginTop: '20px',
            marginBottom: '20px',
            boxShadow: '0px 4px 4px 6px #d2503c',
            ...containerStyle
        }}>
            <h2 style={{
                color: '#fff',
                textAlign: 'center',
                marginBottom: '20px',
                fontWeight: 'bold'
            }}>
                {title} {isRequired && !selectedAvatar && <span style={{ color: '#f55', fontSize: '18px' }}>*</span>}
            </h2>

            {/* Grid de avatares */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '4px',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '15px'
            }}>
                {avatarOptions.map((option, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <img
                            src={option.url}
                            alt={option.alt}
                            style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                border: selectedAvatar === option.url ? '3px solid #7978D9' : '2px solid transparent',
                                transition: 'transform 0.2s, border 0.2s',
                                backgroundColor: selectedAvatar === option.url ? 'rgba(121, 120, 217, 0.1)' : 'transparent',
                                boxShadow: selectedAvatar === option.url ? '0 0 8px rgba(121, 120, 217, 0.6)' : 'none'
                            }}
                            onClick={() => onSelectAvatar(option.url)}
                            onMouseOver={(e) => {
                                if (selectedAvatar !== option.url) {
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                    e.currentTarget.style.border = '2px solid rgba(121, 120, 217, 0.5)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (selectedAvatar !== option.url) {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.border = '2px solid transparent';
                                }
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Avatar selecionado */}
            {showSelected && selectedAvatar ? (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '10px'
                }}>
                    <p style={{ color: '#fff', marginBottom: '5px' }}>Avatar selecionado:</p>
                    <img
                        src={selectedAvatar}
                        alt="Avatar selecionado"
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            border: '3px solid #7978D9',
                            boxShadow: '0 0 10px rgba(121, 120, 217, 0.6)'
                        }}
                    />
                </div>
            ) : (
                isRequired && !selectedAvatar && (
                    <p style={{
                        color: '#f55',
                        textAlign: 'center',
                        fontSize: '14px'
                    }}>
                        * É necessário selecionar um avatar para continuar
                    </p>
                )
            )}

            {/* Botão de atualizar avatares */}
            {showRefreshButton && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '15px'
                }}>
                    <Button onClick={handleRefreshAvatars} style={{ width: 'auto' }}>
                        🔄 Gerar Novos Avatares
                    </Button>
                </div>
            )}
        </div>
    );
}

export default AvatarSelector;