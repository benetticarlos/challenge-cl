import Publication from '../models/publications.js';

export const getPublications = async (req, res) => {
  const publications = await Publication.find();
  const publicationsRev = publications.slice().reverse();
  res.render('pages/publications', { publications: publicationsRev });
};

export const createPublication = async (req, res) => {
  const { title, description, tags } = req.body;
  const newNotification = new Publication({
    title,
    description,
    tags,
  });
  await newNotification.save();
  res.redirect('/publications');
};
