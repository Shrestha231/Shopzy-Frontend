import { Link } from "react-router-dom";

const CategoryCard = ({ title, img, link }) => {
  return (
    <Link
      to={link}
      className="group relative rounded-xl overflow-hidden shadow-md"
    >
      <img
        src={img}
        alt={title}
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform"
      />

      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h3 className="text-white text-2xl font-semibold">{title}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
