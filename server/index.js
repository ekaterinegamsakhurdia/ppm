const express = require("express");
const cors = require("cors");
const pool = require("./db.js");

const app = express();
const PORT = process.env.PORT || 3000;

// todo validate phone number

app.use(express.json());

const CLIENTURL =
  process.env.NODE_ENV === "production"
    ? "https://kiurent.netlify.app"
    : "http://localhost:5173";

app.use(
  cors({
    origin: CLIENTURL,
    // origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  console.log(req);
  res.status(200).json("hello");
});

app.post("/register", async (req, res) => {
  try {
    // todo encrypt password

    const { first_name, last_name, phone, email, password, status } = req.body;
    const validData = validateUser(
      first_name,
      last_name,
      phone,
      email,
      password,
      status
    );
    if (validData !== "valid") res.status(400).json({ error: validData });

    const result = await pool.query(
      `
        insert into users(first_name, last_name, phone_number, email, password) 
values ($1, $2, $3, $4, $5) RETURNING *
        `,
      [first_name, last_name, phone, email, password]
    );

    status.forEach(async (s) => {
      await pool.query(
        "insert into user_statuses (user_email, status) values ($1, $2)",
        [email, s]
      );
    });

    res.status(201).json({ email: email });
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);
    const result = await pool.query(
      "select * from users where email = $1 and password = $2",
      [email, password]
    );

    if (result.rowCount === 0)
      res.status(401).json({ error: "incorrect login information" });

    res.status(200).json({ email: email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get all posts
app.get("/posts", async (req, res) => {
  try {
    console.log(req);
    const posts = await pool.query("select * from posts");
    res.status(200).json({ posts: posts.rows });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get posts by category
app.get("/posts/:type", async (req, res) => {
  try {
    const { type } = req.params;
    console.log(type);
    const posts = await pool.query(
      "select * from posts where product_type = $1",
      [type]
    );

    res.status(200).json({ posts: posts.rows });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get a specific post (by id)
app.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await pool.query(
      `
        select p.*, u.first_name, u.last_name, u.phone_number, u.email
        from posts p
        inner join users u 
        on u.email = p.user_email
        where p.post_id = $1
`,
      [id]
    );

    const imageBuffer = post.rows[0].photo;
    const base64Image = imageBuffer
      ? imageBuffer.toString("base64")
      : imageBuffer;

    res.status(200).json({ post: { ...post.rows[0], photo: base64Image } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get my posts
app.get("/profile", async (req, res) => {
  try {
    const { email } = req.query;
    const posts = await pool.query(
      `
        select *
        from posts p 
        where p.user_email = $1;
    `,
      [email]
    );

    const user_info = await pool.query(
      `select * 
      from users
      where email = $1`,
      [email]
    );

    const formattedPosts = posts.rows.map((post) => ({
      ...post,
      photo: post.photo ? post.photo.toString("base64") : null,
    }));

    res
      .status(200)
      .json({ posts: formattedPosts, user_info: user_info.rows[0] });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// create a new post
app.post("/posts", async (req, res) => {
  try {
    const { email, name, price, image, description, category } = req.body;

    const status = validatePostData(name, price, image, description, category);
    if (status !== "valid") res.status(400).json({ error: status });

    const post = await pool.query(
      `INSERT INTO posts (user_email, product_name, product_price, product_description, product_type, photo) VALUES
($1, $2, $3, $4, $5, $6) RETURNING *`,
      [email, name, price, description, category, image || "NULL"]
    );

    res.status(200).json({ post: post.rows[0] });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await pool.query(`delete from posts where post_id = $1`, [id]);

    res.status(200).json({ post: "delted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, (error) => {
  if (!error) console.log("Server is Successfully Running on " + PORT);
  else console.log("Error occurred, server can't start", error);
});

function validatePostData(name, price, image, description, category) {
  const validCategories = ["Transportation", "Home Appliances", "Other"];
  if (!name.trim()) return "name field can't be empty";
  if (!description.trim()) return "description field can't be empty";
  if (price < 0) return "price can't be negative";
  if (!validCategories.find((c) => c === category)) return "invalid category";

  return "valid";
}

function validateUser(first_name, last_name, phone, email, password, status) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@kiu\.edu\.ge$/;
  const validStatuses = [
    "Student",
    "Staff",
    "Student Assistant",
    "Teaching Assistant",
  ];

  if (!first_name.trim()) return "First name is required.";
  if (!last_name.trim()) return "Last name is required.";
  if (!phone.trim()) return "Phone number is required.";
  if (!email.trim()) {
    return "Email address is required.";
  } else if (!emailPattern.test(email.trim())) {
    return "Only KIU student emails are allowed.";
  }
  if (!password.trim()) {
    return "Password is required.";
  } else if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (status.length === 0) {
    return "There must be at least one status.";
  }
  if (!status.every((s) => validStatuses.some((v) => v === s)))
    return "invalid status detected";

  return "valid";
}
