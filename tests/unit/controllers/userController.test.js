const userController = require('../../../controllers/userController')
const User = require('../../../models/userModel')

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }


describe('users controller', () => {
   
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('get all users', () => {
        test('it returns users with a 200 status code', async () => {
            jest.spyOn(User, 'find')
                 .mockResolvedValue(['habit1', 'habit2']);
            await userController.getUsers(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
    });

    describe('create user', () => {
        test('it returns a new User with a 201 status code', () => {
            jest.setTimeout( async () => {
                let data =  {
                    username: "test1234",
                    scores: 3000 
                }
                let user = new User(data)
                // jest.spyOn(User, 'create')
                //     .mockResolvedValue(User);
                    
                const mockReq = { body: user }
                await userController.createUser(mockReq, mockRes);
                expect(mockStatus).toHaveBeenCalledWith(200);
                expect(mockJson).toHaveBeenCalledWith(User);
            }, 30000)
        })
    })

    describe('update user', () => {
        test('it updates a 204 status code with a successful update',async () => {
            let user =  {
                username: "swimming", 
                scores: 2000
            }            
            jest.spyOn(User, 'findOneAndUpdate')
              .mockResolvedValue(new User(user));

              const mockReq = { params: { id: 1 } }
              await userController.updateUser(mockReq, mockRes);
              expect(mockStatus).toHaveBeenCalledWith(204);
            //   console.log(mockJson)
            //   expect(mockJson).toHaveBeenCalledWith(); 
        })
    })
})
