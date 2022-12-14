import User from "../Models/user.js";

export const destroy = async (req, res) => {
  const categories = req.user.categories;
  const new_categories = categories.filter(
    (category) => category._id != req.params.id
  );
 

  const user = await User.updateOne(
    { _id: req.user.id },
    { $set: { categories: new_categories } }
  );
  res.json({ user });
};

export const create = async(req,res)=>{
 const { label ,icon } = req.body;

  const response = await User.updateOne(
    { _id: req.user.id },
    { $set: { categories: [...req.user.categories, {label,icon}] } }
  );
  res.json({ response });
  
}
