module.exports = async (req, res) => {
  try {
    let username = "";
    let password = "";
    const data = req.flash("data")[0];

    if (typeof data != "undefined") {
      username = data.username;
      password = data.password;
    }

    res.render("register", {
      errors: req.flash("validationErrors"),
      username: username,
      password: password,
    });
  } catch (error) {
    // handle any errors
  }
};
