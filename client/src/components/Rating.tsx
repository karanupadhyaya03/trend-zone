const Rating = (props: {
  rating: number;
  numReviews?: number;
  caption?: string;
}) => {
  const { rating, numReviews, caption } = props;

  const renderStars = (numStars: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= numStars) {
        stars.push(
          <span key={i}>
            <i className="fas fa-star star-rating" />
          </span>
        );
      } else if (i - 0.5 <= numStars) {
        stars.push(
          <span key={i}>
            <i className="fas fa-star-half-alt star-rating" />
          </span>
        );
      } else {
        stars.push(
          <span key={i}>
            <i className="far fa-star star-rating" />
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="rating">
      {renderStars(rating)}
      {caption ? (
        <span>{caption}</span>
      ) : numReviews != 0 ? (
        <span className="star-rating">{` ${numReviews} reviews`}</span>
      ) : (
        ''
      )}
    </div>
  );
};

export default Rating;
