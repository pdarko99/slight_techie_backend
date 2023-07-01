//an api that let users create, update, get and delele a blog

const express = require('express')
const app = express();

app.use(express.json())

let blogs = [{
  id:0,
  title: 'my_first_blog',
  author: "james"
}]

//allows users view all blogs
app.get('/', (req, res, next) => {
  res.status(200).json(blogs)
})

//allows users view a blog by id
app.get('/:id', (req, res, next) => {

  let id = req.params.id
  let blog = blogs.filter(i => i.id === +id)
 
  if(blog && blog.length){
    res.status(200).json(blog)
  }else{
    res.status(200).json({"message": "no blog found with such id"})
  }
})

//allows users update a blog by id
app.put('/:id', (req, res, next) => {

  let id = req.params.id
  blogs = blogs.filter(i => i.id !== id)
  res.status(200).json(blogs)
 
})

//allows users add a blog by 
app.post('', (req, res, next) => {
  console.log(req.body)
  try{
    let data = JSON.parse(req.body)
    blogs = blogs.push(data)
    res.status(200).json({"message": "added successfully"})
  }catch(e){
    res.status(400).json(e)
  }

 
})

//allows users delete a blog by id
app.delete('/:id', (req, res, next) => {

  let id = req.params.id
  let blog = blogs.findIndex(i => i.id === id)

  if(blog !== -1){
    blogs[blog] = req.body
    res.status(200).json(blogs)

  }
  else{
    res.status(200).json({"message": "no blog found with such id"})
  }
})
app.listen(3000, ()=>{
  console.log('app started')
})