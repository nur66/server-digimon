import express from "express";
import fs from "fs"     // file system

const app = express()
const port = 3200;

// routes
app.get('/banner', (req, res) => {
    const data = getData('./data/Banner.json')
    res.json(data)
})

app.get('/mega', (req, res) => {
    const data = getData('./data/Mega.json')
    res.json(data)
})

app.get('/armor', (req, res) => {
    const data = getData('./data/Armor.json')
    res.json(data)
})

app.get('/mega/:id', (req, res) => {
    const data = findData(req.params.id)
    res.json(data)
})


// listen
app.listen(port,()=> {
    console.log(`server sudah berjalan pada port : ${port}`);   
})


const getData = (path) => {
    const data = fs.readFileSync(path, 'utf-8', (err, data) => data)
    // console.log(JSON.parse(data));
    return JSON.parse(data)
}

const findData = (id) => {
    const dataProduct = getData('./data/Mega.json');
    // method find akan melooping data2 yang ada
    const findProduct = dataProduct.find((data) => data.id == parseInt(id))
    console.log(findProduct);
    if(!findProduct) {
        let dummy = [
            {
                "id" : 1,
                "description" : "data tidak ditemukan",
                "images" : "https://www.gamespot.com/a/uploads/original/1587/15875866/4021452-digimon.png"
            }
        ]

        return dummy
    }
    return findProduct
}