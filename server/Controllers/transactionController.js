import Transaction from "../Models/transaction.js";

export const index = async (req, res) => {
  const transaction = await Transaction.find({ user_id: req.user._id }).sort({
    createdAt: -1,
  });
  res.json({ data: transaction });
};

export const create = async (req, res) => {
  
  const { amount, description, date ,category_id} = req.body;

  const transaction = new Transaction({
    amount,
    description,
    user_id: req.user._id,
    date,
    category_id
  });

  await transaction.save();
  res.json({ message: "Success" });
};

export const drop = async (req, res) => {
  const transaction = await Transaction.deleteOne({
    _id: req.params.id,
  });
  res.json({ message: "success" });
};

export const update = async (req, res) => {
  const transaction = await Transaction.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.json({ message: "success" });
};
