import UsersImage from '../../assets/users.png';
import { Background } from './styles';

function DefaultBackground() {
    return (
        <Background>
            <img src={UsersImage} alt="Imagem de usuários" />
        </Background>
    );
}

export default DefaultBackground;