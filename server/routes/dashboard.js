const pool=require("../db");
const router= require("express").Router();
const authorize=require("../middleware/authorize");



//get all tracker_form and firstname &lastname

router.get("/",authorize, async(req,res)=> {
  try {
    const user=await pool.query (
      "SELECT u.user_name, u.user_lastname, t.tracker_form_id, t.exercise, t.repetition, t.weight,t.duration, t.date from users AS u LEFT JOIN tracker_form AS t ON u.user_id = t.user_id WHERE u.user_id = $1",  [req.user.id]
    );
    res.json(user.rows);
  } catch(err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})


module.exports = router;

