const categoriesService = require('../services/categories-service');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoriesService.getAllCategories();

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const newCategory = await categoriesService.createCategory(category);

    res
      .status(201)
      .json(`${newCategory.category} has been successfully created.`);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const oldCategory = req.params.category;
    const newCategory = req.body.category;

    const updatedCategory = await categoriesService.updateCategory(
      oldCategory,
      newCategory,
    );

    res
      .status(200)
      .json(
        `${oldCategory} has been successfully updated to ${updatedCategory.category}.`,
      );
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const deletedCategory = await categoriesService.deleteCategory(category);

    res.status(200).json({
      message: `${deletedCategory.category} was successfully deleted.`,
    });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
};
