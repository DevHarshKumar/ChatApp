import mongoose from 'mongoose'

const friendSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel',
      required: true,
    },
    requests: [
      {
        email: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
        },
      }
    ],
    friends: [
      {
        email: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      }
    ],
  });

const Friends=mongoose.model('friends',friendSchema);
export default Friends;
  