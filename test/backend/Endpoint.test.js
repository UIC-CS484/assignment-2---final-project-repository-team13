const { signup, login } = require('./SendRequest')
const makeId = require('./helper')

/*
* New user test
*/
describe('When new user coming to the website', () => {
    let email
    let password

    beforeAll(() => {
        email = makeId(11)
        password =  makeId(12)
    })

    test('It Should Able To Signup Successfully', async () => {
        try {
            const result = await signup(email, password);
            console.log(result)
        } catch (e) {
            expect(e).toMatch('error')
        }
    })

    test('It Should Able To Login Successfully', async () => {
        try {
            const result = await login(email, password);
            console.log(result)
        } catch (e) {
            expect(e).toMatch('error')
        }
    })
})

