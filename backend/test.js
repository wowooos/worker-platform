const x = (a,b) => {
    return a+b;
};
// console.log(x(1, 2));

//----------------------------------------

id_sent = 1;

let posts = [
    {id: 1, title: 'Post 1'},
    {id: 2, title: 'Post 2'},
    {id: 3, title: 'Post 3'},
    {id: 4, title: 'Post 4'},
];

// console.log(posts.includes(id_sent));
// console.log("Emanuelle".includes('a'));

// let lista = [1, 2, 3, 4, 5];
// console.log(lista.includes(6));

// console.log(posts[0].id);

const result = posts.filter((p)=>{
    return id_sent===p.id;
});

if(posts.filter((p) => id_sent===p.id).length > 0){
    console.log(`ID ${id_sent} EXISTS!!`);
}else{
    console.log(`ID ${id_sent} does not exist...`);
}

