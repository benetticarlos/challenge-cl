import Publication from '../models/publications.js';
export const getPublications = async (req, res) => {
  res.render('pages/publications');
};

// export const createPublication = async (req, res) => {
//   const { title, description, tags } = req.body;
//   const newNotification = new Publication({
//     title,
//     description,
//     tags,
//   });
//   await newNotification.save();
// };
