const express = require("express");
const usersRouter = express.Router();
const models = require("./../models.js");

usersRouter.get("/", (req, res) => {
    models.User.find({}, (err, result) => {
        if(err) return console.log(err);
        res.send(result);
    });
});

usersRouter.get("/:id", async (req, res) => {
    let id = req.params.id;
    let user = await models.User.findById(id);
    res.status(200).send(user);
});

usersRouter.post("/", (req, res) => {
    const {login, password, fullName} = req.body;

    const user = new models.User({
        login, 
        password, 
        fullName,
        cars: []
    });

    user.save(err => {
        if(err) return console.log(err);
        res.send("user added");
    });
});

usersRouter.post('/addCar', async (req, res) => {
    const { userId, carId } = req.body;

    let car = await models.Car.findById(carId);

    let user = await models.User.findById(userId);
    user.cars.push(car);

    await models.User.findByIdAndUpdate(userId, user);
    res.send("car added");
});

module.exports = usersRouter;