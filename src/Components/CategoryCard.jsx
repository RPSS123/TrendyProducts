import {API_ORIGIN} from '../Services/api';

function CategoryCard({ category }) {
  return (
    <div className="col-md-3 mb-4">
      <div className="card text-center border-0 shadow-sm">
        <img
          src={`${API_ORIGIN}${category.imageUrl}` || '/placeholder.png'}
          className="card-img-top"
          alt={category.name}
        />
        <div className="card-body">
          <h6 className="fw-bold">{category.name}</h6>
          <a href={`/category/${category.slug}`} className="stretched-link">
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;

