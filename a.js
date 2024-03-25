let a = [{ '21': 21 }, { '21': 21 }, { '21': 21 }]
a.reduce((acc, item) => { 
    console.log(acc,item);
    return acc
})