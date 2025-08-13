import { Star } from "lucide-react";

export function renderStars(rating: number) {
  const totalStars = 5;
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    if (i <= Math.floor(rating)) {
      // Filled star
      stars.push(<Star key={i} className="text-yellow-500" size="16" />);
    } else {
      // Empty star
      stars.push(<Star key={i} className="text-gray-300" size="16" />);
    }
  }

  return <div className="flex flex-row gap-1">{stars}</div>;
}
