import mongoose from 'mongoose';
import bcrypt from "bcrypt";
const SALT_WORK_FACTOR = 10;

export default function getDbModels() {

  const CategoriesSchema = new mongoose.Schema({
    name: String
  });

  const PlaceSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    latitude: Number,
    longitude: Number,
    location: String,
    price_per_person: Number,
    dateStart: Date,
    dateEnd: Date
  });

  const UserSchema = new mongoose.Schema({
    name: String,
    userName: String,
    birthDate: Date,
    email: String,
    password: String,
    itineraries: [String]
  });

  const TokenSchema = new mongoose.Schema({
    token: String
  });

  UserSchema.pre('save', function(next) {
    let user = this;

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
  });

  UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
  };

  return Object.freeze({
    categoriesModel: mongoose.model('Category', CategoriesSchema),
    placesModel: mongoose.model('Place', PlaceSchema),
    userModel: mongoose.model('User', UserSchema),
    tokenModel: mongoose.model('Token', TokenSchema)
  });
}
