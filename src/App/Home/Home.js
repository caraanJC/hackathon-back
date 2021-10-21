import { useHistory } from 'react-router-dom';
import Kid from 'assets/images/studying-kid.jpg';

const Home = () => {
  const history = useHistory();

  const changeDirectory = (e) => {
    history.push(`/${e.target.name}`);
  };

  return (
    <div className="home">
      <div className="home__container">
        <h1 className="text-accent">Auxilium</h1>
        <h2 className="text-accent-dark">Help Others by Ordering</h2>
        <p>
          For every purchase you make, 6% of the net profit goes to feeding kids
          in rural areas in the Philippines. Some of the funds goes to school
          supplies and gadgets used for online school.
        </p>
        <div className="buttons">
          <button
            className="btn btn-accent text-white"
            onClick={changeDirectory}
            name="shop"
          >
            Shop Now
          </button>
          <button
            className="btn btn-border-accent"
            onClick={changeDirectory}
            name="about"
          >
            Learn More
          </button>
        </div>
      </div>
      <div className="home__container__img"></div>
    </div>
  );
};

export default Home;
