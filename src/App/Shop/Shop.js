import Navbar from 'shared/Navbar';

const Shop = () => {
  return (
    <div className="shop">
      <Navbar />
      <div className="shop__container">
        <div className="card">
          <div className="card__head">
            <img src="" alt="" />
          </div>
          <div className="card__body">
            <div className="description">
              <h3>Name</h3>
              <h4>Php 300</h4>
            </div>
            <div className="buttons">
              <div className="btn btn-accent">Add to Cart</div>
              <div className="btn btn-border-accent">View</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
