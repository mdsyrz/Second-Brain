module.exports = async (req, res, next) => {
  try {
    // if user logged in, redirect to home page
    if (req.session.userId) {
      return res.redirect("/");
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
};
