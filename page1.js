console.log("hello");
// const { create } = require('domain');
const fs = require('fs');
const { createServer } = require('http');
const data = fs.readFileSync("./data.json", "utf8");
const dataobj = JSON.parse(data).products;
const inputElement = `
<form action='/product'>
<input type="text" name="productName">
<button type="submit" >Search</button>
</form>
`

const cardTemplate = `
<div class='product-card'>
<h2>_TITLE_</h2>
<img src="img_srcs" alt='product-image' />
<a href="$product-links$">more info</a>
</div>
`;

let result = [];
for (let i = 0; i < dataobj.length; i++) {
    // result.push(cardTemplate);
    let temp = cardTemplate;
    temp = temp.replace('_TITLE_', dataobj[i].title);
    temp = temp.replace('img_srcs', dataobj[i].images[0]);
    temp = temp.replace('$product-links$', `?id=${i}`);
    //temp=temp.replace('')
    result.push(temp);
}
result = result.join(' ');
// console.log(result);

const http = require('http');
const url = require('url');
const server = http.createServer((req, res) => {
    // res.end(cardTemplate);
    // const route=req.url;
    // console.log("\n",route,"\n");
    const path = url.parse(req.url, true);
    const pathName = path.pathname;
    console.log("\n", pathName, "\n");
    if (pathName == '/home') {
        res.end(inputElement + result);//yhainputElement + result kiya submit button ke liye

    }
    else if (pathName == '/product') {
        // const id =q.id;
        // const pName=q.productName;

        const search = dataobj[id];
        res.end(search.title);
        res.end('product Page');

        //  if(id){
        //  res.end(id);
        //  }
        //  else{
        //     res.end('Error');
        //  }
        res.end(`
    <div>
    <h4>${search.title}</h4>
    </div>`)

    }

    else {
        res.end('404...not found');
    }

    // res.end(result);
})
server.listen(9000, () => {

    console.log('.........server start......');
});
