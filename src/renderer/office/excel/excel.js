import officegen from 'officegen'
import fs from 'fs'

// Create an empty Excel object:
const xlsx = officegen('xlsx')

// Officegen calling this function after finishing to generate the xlsx document:
xlsx.on('finalize', function(written) {
    console.log(
        'Finish to create a Microsoft Excel document.'
    )
})

// Officegen calling this function to report errors:
xlsx.on('error', function(err) {
    console.log(err)
})



export function exportToExcel(list, path) {
    let sheet = xlsx.makeNewSheet()
    sheet.name = 'Book Excel'
    sheet.setCell('A1','图书名称')
    sheet.setCell('B1','ISBN')
    sheet.setCell('C1','作者')
    sheet.setCell('D1','出版社')
    sheet.setCell('E1','出版时间')
    sheet.setCell('F1','售价')
    sheet.setCell('G1','库存')
    sheet.setCell('H1','页数')
    sheet.setCell('I1','评分')
    sheet.setCell('J1','状态')
    sheet.setCell('K1','内容')

    for(let i = 0; i < list.length; i++){
        sheet.setCell("A"+(i+2),list[i].title)
        sheet.setCell("B"+(i+2),list[i].ISBN)
        sheet.setCell("C"+(i+2),list[i].author)
        sheet.setCell("D"+(i+2),list[i].press)
        sheet.setCell("E"+(i+2),list[i].publishTime)
        sheet.setCell("F"+(i+2),list[i].price)
        sheet.setCell("G"+(i+2),list[i].stock)
        sheet.setCell("H"+(i+2),list[i].pages)
        sheet.setCell("I"+(i+2),list[i].rate)
        sheet.setCell("J"+(i+2),list[i].status)
        sheet.setCell("K"+(i+2),list[i].content.replace(/\s*/g,""))
    }

    let out = fs.createWriteStream(path + 'books.xlsx')

    out.on('error', function(err) {
        console.log(err)
    })

// Async call to generate the output file:
    xlsx.generate(out)
}
