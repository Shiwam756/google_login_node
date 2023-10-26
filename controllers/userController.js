const db = require("../database/db");

const loadAuth = (req, res) => {
  res.render("auth");
};

const successGoogleLogin = (req, res) => {
  if (!req.user) {
    res.redirect("/failure");
  } else {
    const { email, id, displayName, photos, phone } = req.user;

    // Insert user data into the database
    db.query(
      "INSERT INTO user_details (google_id, email, name, profile_picture, phone) VALUES (?, ?, ?, ?, ?)",
      [id, email, displayName, photos[0].value, phone],
      (error, results) => {
        if (error) {
          console.error(
            "Error inserting user data into the database: " + error
          );
          res.send("Error");
        } else {
          //   res.send("Welcome " + displayName);
          console.log(req.user);
          res.send(`
              Welcome ${displayName}<br>
              Email: ${email}<br>
              Profile Picture: <img src="${
                photos[0].value
              }" alt="Profile Picture"><br>
              Phone: ${phone || "Not provided"}
            `);
          //   const userData = {
          //     displayName,
          //     email,
          //     profilePicture: photos[0].value,
          //     phone: phone || "Not provided",
          //   };
          //   res.json(userData);
          //   res.status(200).json({
          //     message: "Data inserted into database successfully!",
          //   });
        }
      }
    );
  }
};

const getAllUserData = (req, res) => {
  // Fetch all user data from the database
  db.query(
    "SELECT name, email, profile_picture, phone FROM user_details",
    (error, results) => {
      if (error) {
        console.error(
          "Error fetching all user data from the database: " + error
        );
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        res.status(200).json(results);
      }
    }
  );
};

const failureGoogleLogin = (req, res) => {
  res.send("Error");
};

module.exports = {
  loadAuth,
  successGoogleLogin,
  failureGoogleLogin,
  getAllUserData,
};
