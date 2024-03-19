const { register, login } = require('../Controllers/userController')

test('register a new user ',()=>{
 const req ={
    body:{
       email :'test@gmail.com',
       password:'1234567',
       username:'John Doe'
    }
 }
 const res ={
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
 }
 register(req,res)

 expect(res.status).toHaveBeenCalledWith(201);
 expect(res.json).toHaveBeenCalledWith({message:"User registered successfully"})
})

test('login a user',()=>{
   const req={
      body:{
         email:'',
         password:''
      }
   }
   const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
   }
   login(req,res)
})
  