import { Schema, model, models } from 'mongoose';

const ProdSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    unique: false,
  },
  categories: {
    type: [String],
    required: true,
    unique: false,
  },
  collection: {
    type: String,
    required: true,
    unique: false,
  },
  materialInfo: {
    type: String,
    required: false,
    unique: false,
  },
  features: {
    type: [String],
    required: false,
    unique: false,
  },
  variants: {
    type: [Map],
    required: true,
    unique: false,
  }
});

const Prod = model('Prod', ProdSchema);

export default Prod;