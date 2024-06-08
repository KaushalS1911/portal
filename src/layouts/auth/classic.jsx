import PropTypes from 'prop-types';
import Header from '../main/header';

export default function AuthClassicLayout({ children, image, title }) {

  return (
    <>
      <Header/>
      {children}
    </>
  );
}

AuthClassicLayout.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
  title: PropTypes.string,
};
