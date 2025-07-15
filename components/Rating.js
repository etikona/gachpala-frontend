export default function Rating({ rating = 0, editable = false }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center">
      {stars.map((star) => (
        <button
          key={star}
          type={editable ? "button" : undefined}
          className={`text-xl ${
            star <= rating ? "text-amber-400" : "text-emerald-200"
          } ${editable ? "hover:scale-110 transition-transform" : ""}`}
          aria-label={`${star} stars`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
