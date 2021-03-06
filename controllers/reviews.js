const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.addReview = async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  const review = new Review(req.body);
  review.author = req.user._id;
  camp.reviews.push(review);
  await review.save();
  await camp.save();
  req.flash("success", "Review Added!");
  res.redirect(`/campgrounds/${camp._id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");
  res.redirect(`/campgrounds/${id}`);
};
