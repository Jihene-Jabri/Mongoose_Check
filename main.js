const mongoose = require("mongoose");

// database connect
require("dotenv").config({ path: "./.env" });

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected"))
  .catch((err) => console.error("Failed to connect"));

// Create a person prototype (SCHEMA)

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

//  create the model
const Person = mongoose.model("person", personSchema);

//  Create and Save a Record of a Model:

// let newPerson = new Person({
//   name: "Aline",
//   age: 33,
//   favoriteFoods: ["Pizza", "Mloukhia"],
// });
// newPerson.save((err) => {
//   if (err) throw err;
//   console.log("newPerson added succesfully!");
// });

// Create Many Records with model.create()

// let arrayOfPerson = [
//   { name: "Souad", age: 45, favoriteFoods: ["jelbena", "kosksi", "mdarbel"] },
//   { name: "Yosra", age: 13, favoriteFoods: ["mermez", "tajin", "tacos"] },
//   { name: "Chaima", age: 23, favoriteFoods: ["kamounia", "lasania"] },
//   { name: "Souad", age: 35, favoriteFoods: ["makloub", "kosksi"] },
//   { name: "Aymen", age: 37, favoriteFoods: ["kosksi", "pizza"] },
// ];

// Person.create(arrayOfPerson)
//   .then((persons) => {
//     console.log("Persons are succesfully saved!", persons);
//   })
//   .catch((err) => console.log(err));

// Find all the people having the name Souad

// Person.find({ name: "Souad" }, function (err, res) {
//   if (err) throw err;
//   console.log(res);
// });
//  find one person's favorite food is kamounia
// Person.findOne({ favoriteFoods: "kamounia" }, function (err, res) {
//   if (err) throw err;
//   console.log(res);
// });
// find person by id
// let personId = "60cfa322cb506d1f109fcfb1";
// Person.findById(personId, function (err, res) {
//   if (err) throw err;
//   console.log(res);
// });
//adding humberger as a favoritefood to the person with personId
// let personId = "60cfa34f7636362aa44835cb";
// Person.findById(personId).then((person) => {
//   person.favoriteFoods.push("humberger");
//   person.save();
// });
// Perform New Updates on a Document Using model.findOneAndUpdate()

// let personName = "Chaima";
// Person.findOneAndUpdate(
//   { name: personName },
//   { $set: { age: 20 } },
//   { new: true }
// );

// Delete One Document Using model.findByIdAndRemove
// const nameToRemove = "Souad";
// Person.remove({ name: nameToRemove }, function (err, res) {
//   if (err) throw err;
//   console.log(res);
// });

// Chain Search Query Helpers to Narrow Search Results
var queryChain = function (done) {
  var foodToSearch = "pizza";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) done(err);
      done(null, data);
    });
};
