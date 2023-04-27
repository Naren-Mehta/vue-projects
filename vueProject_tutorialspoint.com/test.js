const columns = [{
    name: 'naren',
},
{
    name: 'singh',
    displayable: false
},
{
    name: 'mehta',
    displayable: true
}]

const result = columns.filter(col => col.displayable !== false);
console.log(result);