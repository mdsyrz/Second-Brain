module.exports = async (req, res) => {
  try {
    await req.session.destroy();
    res.redirect("/");
  } catch (error) {
    // handle any errors
  }
};
