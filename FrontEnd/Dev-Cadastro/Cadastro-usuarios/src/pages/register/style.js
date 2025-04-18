import styled, { keyframes } from 'styled-components';

// 💥 Animação da mensagem
const popInOut = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  10% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1);
  }
  90% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
`;

export const CelebrationMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  font-size: 2.5rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 20px 40px;
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  animation: ${popInOut} 3s ease-in-out forwards;
  text-align: center;
`;