// **** Your JavaScript code goes here ****
d3.csv('baseball_hr_leaders_2017.csv').then((players) => {
    d3.select('#homerun-leaders')
        .selectAll('p')
        .data(players)
        .enter()
        .append('p')
        .text((d) => `${d.rank}. ${d.name} with ${d.homeruns} home runs`)
        .style('font-weight', (d) => d.rank === "1" ? "bold" : "normal");
    
    const rows = d3.select('#homerun-table').select('tbody')
        .selectAll('tr')
        .data(players)
        .enter()
        .append('tr');

    const columns = ["rank", "name", "homeruns"];
    rows.selectAll('td')
        .data(function (row) {
            return columns.map(function (column) {
                return { column: column, value: row[column] }
            });
        })
        .enter()
        .append('td')
        .text(d => d.value)
        .style('border', '1px solid black')
        .style('padding', '15px')
        .style('text-align', 'left')
});