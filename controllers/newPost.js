module.exports = async (req, res) => {
  try {
    if (req.session.userId) {
      return res.render("create", {
        createPost: true,
      });
    } else {
      res.redirect("/auth/login");
    }
  } catch (error) {
    // handle any errors
  }
};
