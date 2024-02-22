
var chai =require('chai')
var assert =chai.assert

// describe('check ',function(){
//     let username="Pushti";
//     it('is String',function(){
//         assert.typeOf(username,'string')
//     })
// })
// describe('Array', function () {
//   describe('#indexOf()', function () {
//     it('should return -1 when the value is not present', function () {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });
describe('my first tescase',function(){
    it('value check',function(){
        assert.equal([1,2,3].indexOf(3),2);
    });
})