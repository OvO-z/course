import officegen from 'officegen'
import fs from 'fs'

// Create an empty Word object:
let docx = officegen('docx')

// Officegen calling this function after finishing to generate the docx document:
docx.on('finalize', function(written) {
    console.log(
        'Finish to create a Microsoft Word document.'
    )
})

// Officegen calling this function to report errors:
docx.on('error', function(err) {
    console.log(err)
})

export function exportToWord(list, path) {
    for(let i =0; i < list.length; i++){
        let pObj = docx.createP()
        pObj.addText("图书名称：" + list[i].title,{color:'',font-size:''})
        pObj.addText("\tISBN号:" + list[i].ISBN)
        pObj.addText("\t作者:" + list[i].author)
        pObj.addLineBreak()
        pObj.addText("出版时间：" + list[i].publishTime)
        pObj.addText("\t页数：" + list[i].pages)
        pObj.addText("\t出版社：" + list[i].press)
        pObj.addLineBreak()
        pObj.addText("售价：" + list[i].price)
        pObj.addText("\t库存：" + list[i].stock)
        pObj.addText("\t评分："+ list[i].rate)
        pObj.addLineBreak()
        pObj.addText("内容概要：")
        pObj.addLineBreak()
        pObj.addText(list[i].content)
    }

    let out = fs.createWriteStream(path+'books.docx')

    out.on('error', function(err) {
        console.log(err)
    })

    docx.generate(out)
}
