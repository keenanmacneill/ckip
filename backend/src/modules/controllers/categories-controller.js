const db = require('../../db/knex');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await db('categories').select('category');

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { category } = req.body;

    const match = await db('categories')
      .select('*')
      .where('category', category);

    if (match.length) {
      return res.status(400).json({ message: 'Category already exists.' });
    }

    const [newCategory] = await db('categories')
      .insert({ category })
      .returning('*');

    res
      .status(201)
      .json(`${newCategory.category} has been successfully created.`);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const newCategory = req.body.category;
    const oldCategory = req.params.category;

    const [match] = await db('categories')
      .select('*')
      .where('category', oldCategory);

    if (!match) {
      return res.status(404).json({ message: 'Category does not exist.' });
    }

    if (match.category === newCategory) {
      return res.status(400).json({ message: 'No changes detected.' });
    }

    const [updatedCategory] = await db('categories')
      .where('category', oldCategory)
      .update({
        category: newCategory,
      })
      .returning('*');
    console.log(updatedCategory);

    res
      .status(200)
      .json(
        `${oldCategory} has been successfully updated to ${updatedCategory.category}.`,
      );
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const [match] = await db('categories')
      .select('*')
      .where('category', category);

    if (!match) {
      return res.status(404).json({ message: 'Category does not exist.' });
    }

    const [deletedCategory] = await db('categories')
      .where('category', category)
      .del()
      .returning('category');

    res.status(200).json({
      message: `${deletedCategory.category} was successfully deleted.`,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};
