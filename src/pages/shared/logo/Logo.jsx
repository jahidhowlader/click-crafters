import { Link } from 'react-router-dom';

const Logo = () => {

    const logo = 'ClickCrafters'

    return <Link to="/" className="btn btn-ghost uppercase">{logo.split('').map((word, idx) => <span key={idx} className="bg-white text-black w-4 h-4">{word}</span>)}</Link>
};

export default Logo;