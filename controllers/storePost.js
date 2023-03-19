const BlogPost = require("../models/BlogPost");
const path = require("path");

module.exports = async (req, res) => {
  try {
    const image = req.files.image;
    const imagePath = path.resolve(__dirname, "..", "public/image", image.name);
    await image.mv(imagePath);
    await BlogPost.create({
      ...req.body,
      image: "/img/" + image.name,
    });
    res.redirect("/");
  } catch (error) {
    // handle any errors
  }
};
