const habitController = require('../../../controllers/habits')
const Habit = require('../../../models/habits')

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }


describe('habits controller', () => {
   
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it returns habtis with a 200 status code', async () => {
            jest.spyOn(Habit, 'all', 'get')
                 .mockResolvedValue(['habit1', 'habit2']);
            await habitController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            // expect(mockJson).toHaveBeenCalledWith(['habit1', 'habit2']);
        })
    });

    describe('showHabit', () => {
        test('it returns a specific habit with a 200 status code', async () => {
            let testHabit =  {
                content: "skipping", email: "test@gmail.com", dates: [{
                date: "2022-18-22",
                complete: "yes"
            },{
                date: "2022-18-22",
                complete: "no"
            },{
                date: "2022-18-22",
                complete: "yes"
            }]}
            jest.spyOn(Habit, 'findByHabit')
                .mockResolvedValue(new Habit(testHabit));
                
            const mockReq = { params: { id: 1 } }
            await habitController.showHabit(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    });

    describe('showEmail', () => {
        test('it returns a specific habit with a 200 status code', async () => {
            let testHabit =  {
                content: "skipping", email: "test@gmail.com", dates: [{
                date: "2022-18-22",
                complete: "yes"
            },{
                date: "2022-18-22",
                complete: "no"
            },{
                date: "2022-18-22",
                complete: "yes"
            }]}
            jest.spyOn(Habit, 'findByEmail')
                .mockResolvedValue(new Habit(testHabit));
                
            const mockReq = { params: { id: 1 } }
            await habitController.showEmail(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    });

    describe('create', () => {
        test('it returns a new habit with a 201 status code', async () => {
            let testHabit =  {
                content: "flying", email: "test2@gmail.com", dates: [{
                date: "2022-18-22",
                complete: "yes"
            },{
                date: "2022-18-22",
                complete: "no"
            },{
                date: "2022-18-22",
                complete: "yes"
            }]}
            jest.spyOn(Habit, 'create')
                .mockResolvedValue(new Habit(testHabit));
                
            const mockReq = { body: testHabit }
            await habitController.create(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    });

    describe('destroy', () => {
        test('it returns a 204 status code on successful deletion', async () => {
            jest.spyOn(Habit.prototype, 'destroy')
                .mockResolvedValue('Deleted');
            
            const mockReq = { params: { id: 1 } }
            await habitController.destroy(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(204);
        })
    });

    describe('update', () => {
        test('it updates a 204 status code with a successful update',async () => {
            let testHabit =  {
                content: "swimming", email: "test3@gmail.com", dates: [{
                date: "2022-18-22",
                complete: "yes"
            },{
                date: "2022-18-22",
                complete: "no"
            },{
                date: "2022-18-22",
                complete: "yes"
            }]}            
            jest.spyOn(Habit, 'findByHabit')
              .mockResolvedValue(new Habit(testHabit));

              const mockReq = { params: { id: 1 } }
              await habitController.showHabit(mockReq, mockRes);
              expect(mockStatus).toHaveBeenCalledWith(200);
              expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    })
})
