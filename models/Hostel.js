const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  rating: { type: Number, required: true }
});

const hostelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  imageUrls: { type: [String], required: true },
  averageRating: { type: Number, required: true },
  ratings: { type: [ratingSchema], required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  savedBy: { type: [String], default: [] }, // Array of user IDs who have saved this hostel
  mealPlan: { type: String, required: true},
  academicProgrammes: { type: String, required: true},
  hostelActivities: { type: String, required: true}
});

const Hostel = mongoose.model('Hostel', hostelSchema);

module.exports = Hostel;
