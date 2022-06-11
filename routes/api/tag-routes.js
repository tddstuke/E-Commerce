const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const data = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product }],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const data = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      // be sure to include its associated Product data
      include: [{ model: Product }],
    });
    if (!data) {
      res.status(404).json({ message: "No tag found for that id" });
      return;
    }
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const data = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const data = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const data = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({ message: "No tag found for this id" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
