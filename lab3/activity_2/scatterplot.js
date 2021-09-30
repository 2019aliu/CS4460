// **** Your JavaScript code goes here ****

const columns = ['name','rank','year','homeruns'];
d3.csv('baseball_hr_leaders.csv').then((data) => {
    d3.select("#main").select("svg")
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d, _) => scaleYear(parseInt(d.year)))
        .attr('cy', (d, _) => scaleHomeruns(parseInt(d.homeruns)))
        .attr('r', '2px')
        .style('fill', (d, _) => parseInt(d.rank) <= 3 ? '#B3A369' : '#003057')
        .style('opacity', (d, _) => parseInt(d.rank) <= 3 ? '100%' : '12.5%')
});

// **** Functions to call for scaled values ****

function scaleYear(year) {
    return yearScale(year);
}

function scaleHomeruns(homeruns) {
    return hrScale(homeruns);
}

// **** Code for creating scales, axes and labels ****

var yearScale = d3.scaleLinear()
    .domain([1870,2017]).range([60,700]);

var hrScale = d3.scaleLinear()
    .domain([0,75]).range([340,20]);

var svg = d3.select('svg');

svg.append('g').attr('class', 'x axis')
    .attr('transform', 'translate(0,345)')
    .call(d3.axisBottom(yearScale).tickFormat(function(d){return d;}));

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(360,390)')
    .text('MLB Season');

svg.append('g').attr('class', 'y axis')
    .attr('transform', 'translate(55,0)')
    .call(d3.axisLeft(hrScale));

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(15,200) rotate(90)')
    .text('Home Runs (HR)');

svg.append('text')
    .attr('class', 'title')
    .attr('transform','translate(360,30)')
    .text('Top 10 HR Leaders per MLB Season');