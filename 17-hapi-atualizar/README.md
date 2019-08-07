docker exec -it 0be4f6c41ccd mongo -u admin -p adminsenha --authenticationDatabase admin

##insert

db.admin.insert({
nome:'vinistrauss',
poder:'inteligente',
dtaaNascimento:'1996-11-08'
})

##select
db.admin.find()

##update
db.admin.update({\_id: ObjectId("5d2145d485b9db6e1e6cdbc0")},{\$set:{poder:'foda'}})

##delete
db.admin.remove({})
