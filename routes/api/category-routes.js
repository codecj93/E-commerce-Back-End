const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  //   Category.bulkCreate([
  //     {
  //       category_name: 'Kitchen'
  //     },
  //     {
  //       category_name: 'Furniture'
  //     }
  //   ])
  //     .then(() => {
  //       res.send('Database seeded');
  //     })
  //     .catch((err) => {
  //     res.json(err);
  //   });
  // });
  try {
    const categoryData = await Category.create(req.body); // Dynamically create category based on request body
    res.status(200).json(categoryData); // Send back the created category
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(
      {
        name: req.body.category_name
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
    // .then((updatedCategory) => {
    //   res.json(updatedCategory);
    // })
    // .catch((err) => {
    //   console.log(err);
    //   res.json(err);

  }

});



router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No categoryfound with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
