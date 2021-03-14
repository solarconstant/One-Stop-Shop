const Category = require('../models/category');
const SubCategory = require('../models/subcategory');
const slugify = require('slugify');

exports.create = async (req, res) =>
{
    try
    {
        const { name } = req.body;
        const category = await new Category({name, slug: slugify(name).toLowerCase()}).save();
        res.json(category);
    }
    catch(err)
    {
        res.status(400).send('Create Category Failed');
    }
};

exports.list = async (req, res) =>
{
    res.json(await Category.find({}).sort({createdAt: -1}).exec());
};

exports.update = async (req, res) => {
    const { name } = req.body;
    try {
      const updated = await Category.findOneAndUpdate(
        { slug: req.params.slug },
        { name, slug: slugify(name) },
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res.status(400).send("Create update failed");
    }
  };

exports.remove = async (req, res) =>
{
    try
    {
        const deleted = await Category.findOneAndDelete({slug: req.params.slug});
        res.json(deleted);
    }
    catch(err)
    {
        res.status(400).send("Deletion failed.");
    }
};

exports.read = async (req, res) =>
{
    let category = await Category.findOne({ slug: req.params.slug }).exec();
    res.json(category);
};

exports.getSubs = async (req, res) =>
{
    SubCategory.find({parent: req.params._id}).exec((err, subs) =>
        {
            if(err)
            {
                console.error(err);
            }
            res.json(subs);
            console.log(subs);
        }
    )
}