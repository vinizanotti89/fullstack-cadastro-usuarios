import PropTypes from 'prop-types';
import { Button, LinkButton } from './styles';


function DefaultButton({ children, theme, isLink, ...props }) {
    return isLink ? (
      <LinkButton to="/register" themeType="diferente" {...props}>
        {children}
      </LinkButton>
    ) : (
      <Button {...props} theme={theme}>
        {children}
      </Button>
    );
  }
  DefaultButton.propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.string,
    isLink: PropTypes.bool
  };


export default DefaultButton;

export { Button, LinkButton };