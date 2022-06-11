const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const data = await Category.findAll({
      // be sure to include its associated Products
      include: [
        {
          model: Product,
        },
      ],
    });

    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const data = await Category.findOne({
      where: {
        id: req.params.id,
      },
      // be sure to include its associated Products
      include: [
        {
          model: Product,
        },
      ],
    });
    if (!data) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const data = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const data = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    // if (!data) {
    //   res.status(404).json({ message: "No user found with this id" });
    //   return;
    // }
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
