// icons
import { FiSearch } from 'react-icons/fi';
import { IoCart } from 'react-icons/io5';
import { FaChevronDown } from 'react-icons/fa';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import UseComponentVisible from 'shared/UseComponentVisible';

const Navbar = () => {
  const token = useSelector((state) => state.token);

  const openSublist = () => {
    setIsComponentVisible(true);
  };

  const { ref, isComponentVisible, setIsComponentVisible } =
    UseComponentVisible(false);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/shop" className="navbar__logo">
          <h1 className="text-accent-dark">Auxilium</h1>
        </Link>
        <div className="navbar__searchbar">
          <input type="text" placeholder="Search..." />
          <FiSearch />
        </div>

        <div className="navbar__options">
          {token ? (
            <div>
              <div>
                <img src="" alt="Avatar" />
              </div>
              <p>Username</p>
            </div>
          ) : (
            <button className="btn btn-accent">login</button>
          )}
          <Link to="/cart">
            <IoCart />
          </Link>
          <FaChevronDown onClick={openSublist} />
          <div className="logout" ref={ref}>
            {isComponentVisible && <Link to="/shop">Logout</Link>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
