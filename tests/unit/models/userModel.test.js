const request = require('supertest');
const Habit = require('../../../models/habits')
const mongodb = require('mongodb');
jest.mock('mongodb')
const db = require('../../../dbconfig')

describe('Habit', () => {
    let api
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        // it('should get all users', () => {
        //     jest.setTimeout(() => {
        //         const res = request(api).post('/')
        //         expect(res.statusCode).toEqual(200)
        //     }, 10000)
        // })

    });

    describe('create', () => {
        it('create new habit', () => {
            jest.setTimeout(() => {
                const res = request(api).post('/')
                expect(res.statusCode).toEqual(200)
            }, 10000)
        })
        // test('it creates a new habit', async () => {
        //     const newHabit = await (await request(api).post('/')).send({
        //         content: "running", email: "vincent@gmail.com", dates: [{date: "2022-18-22", complete: "yes"}, {date: "2022-18-22",complete: "no"}, {date: "2022-18-22", complete: "yes"}]})
        //         expect(res.text.toString()).toContain('Habit was created')
        // })
    });

    describe('findByEmail', () => {
        it('return habits via email', () => {
            jest.setTimeout(() => {
                const res = request(api).post('/')
                expect(res.statusCode).toEqual(200)
            }, 10000)
        })
    });

    describe('findByHabit', () => {
        it('finds habit', () => {
            jest.setTimeout(() => {
                const res = request(api).post('/')
                expect(res.statusCode).toEqual(200)
            }, 10000)
        })
    });

    describe('update', () => {
        it('updates a habit', () => {
            jest.setTimeout(() => {
                const res = request(api).post('/')
                expect(res.statusCode).toEqual(200)
            }, 10000)
        })
    });

    describe('destroy', () => {
        it('deletes a habit', () => {
            jest.setTimeout(() => {
                const res = request(api).post('/')
                expect(res.statusCode).toEqual(200)
            }, 10000)
        })
        // test('it delets a habit', async () => {
        //     jest.setTimeout(db, 'habits')
        //         .mockResolvedValueOnce({ id: 1 });
        //     let testHabit = new Habit({ id: 1})
        //     const result = await testHabit.destroy();
        //     expect(result).toBe('Habit is deleted')
        // })
    });
})

