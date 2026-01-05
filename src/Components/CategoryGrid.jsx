import CategoryCard from './CategoryCard';

function CategoryGrid({ categories }) {
  return (
    <section className="container my-5">
      <h2 className="text-center fw-bold mb-4">SHOP BY CATEGORY</h2>
      <div className="row">
        {categories.map(cat => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
}

export default CategoryGrid;
