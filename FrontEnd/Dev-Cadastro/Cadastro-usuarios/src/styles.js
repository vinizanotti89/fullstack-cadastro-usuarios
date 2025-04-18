import styled from 'styled-components'

export const Container = styled.div`
    background-color: #3c3c3c;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 20px;
    min-height: 100vh;
    width: 100%;
    position: relative;
`

export const UnlockImageContainer = styled.div`
    position: fixed;
    top: 55%;
    left: 62%;
    transform: translate(-50%, -50%);
    z-index: 10;
    background-color: #38b000;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    
    img {
        max-width: 150px;
        max-height: 150px;
        display: block;
        margin: 0 auto;
    }
    
    /* Animação para aparecer suavemente */
    animation: fadeIn 0.3s ease-in-out;
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`

export const LockImageContainer = styled.div`
    position: fixed;
    top: 55%;
    left: 62%;
    transform: translate(-50%, -50%);
    z-index: 10;
    background-color: #960200;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    
    img {
        max-width: 150px;
        max-height: 150px;
        display: block;
        margin: 0 auto;
    }
    
    /* Animação para aparecer suavemente */
    animation: apareceDesaparece 3s ease-in-out forwards;
    
        @keyframes apareceDesaparece {
            0% {
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                visibility: hidden;
            }
}
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    max-width: 500px;
`

export const Title = styled.h2`
    color: #fff;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    font-style: italic;
`

export const ContainerInputs = styled.div`
    display: flex;
    gap: 20px;
`

export const Input = styled.input`
    border-radius: 10px;
    border: 1px solid #d2dae2;
    background-color: #fff;
    padding: 12px 20px;
    outline: none;
    width: 100%;
`

export const InputLabel = styled.label`
    color: #fff;
    font-size: 18px;
    font-weight: 500;

    span{
        color: #ef4f45;
        font-weight: bold;
    }
`


export const UserName = styled.span`
    color: #32CD32;
    font-weight: bold;
`

export const CustomH3 = styled.h3`
    color: #fff;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
`

export const CustomH4 = styled.h4`
    color: #fff;
    margin: 10px 0;
    font-weight: bold;
`

export const CustomP = styled.p`
    color: #fff;
    margin: 10px 0;
    padding: 15px;
`

export const AvatarContainer = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`;

export const AvatarImage = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    border: ${({ selected }) => (selected ? '3px solid #00f' : '2px solid transparent')};
`;

export const AvatarUser = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`;