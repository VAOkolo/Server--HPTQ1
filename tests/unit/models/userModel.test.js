const mongoose = require('mongoose')
const mongoDB = "mongodb+srv://testdb:testdb@testdb.stugjxi.mongodb.net/?retryWrites=true&w=majority"
const User = require('../../../models/userModel')
jest.setTimeout(30000);

const connectDB = () => mongoose.connect(mongoDB)
let db; 

//simply testing that the model works appropriately
describe("User model test", () => {
    beforeAll(async () => {
        db = await connectDB()
        await User.deleteMany({});
    })

    afterEach(async () => {
        await User.deleteMany({});   
    })

    afterAll(async () => {
        await mongoose.connection.close();
    })

    it("has a module", () => {
        expect(User).toBeDefined();
    })

    describe("get users", () => {
        it("gets users", async () => {
            const user = new User({username: "test12345", scores: 5000})
            await user.save();

            const foundUser = await User.findOne({name: "test12345"})
            const expected = "test12345"
            const actual = foundUser.username;
            expect(actual).toEqual(expected)
        })
    })

    describe("save users", () => {
        it("saves a user", async () => {
            const user = new User({username: "test12345", scores: 5000})
            const savedUser = await user.save();
            const expected = "test12345"
            const actual = savedUser.username;
            expect(actual).toEqual(expected)
        })
    })

    describe("update users", () => {
        it("updates a user", async () => {
            const user = new User({username: "test12345", scores: 5000})
            await user.save()

            user.username = "test123"
            const updatedUser = await user.save();

            const expected = "test123"
            const actual = updatedUser.username;
            expect(actual).toEqual(expected)
        })
    })

})
