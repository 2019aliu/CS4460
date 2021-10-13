// **** Example of how to create padding and spacing for trellis plot****
var svg = d3.select('svg');

// Hand code the svg dimensions, you can also use +svg.attr('width') or +svg.attr('height')
var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

// Define a padding object
// This will space out the trellis subplots
var padding = {t: 20, r: 20, b: 60, l: 60};

// Compute the dimensions of the trellis plots, assuming a 2x2 layout matrix.
trellisWidth = svgWidth / 2 - padding.l - padding.r;
trellisHeight = svgHeight / 2 - padding.t - padding.b;

// As an example for how to layout elements with our variables
// Lets create .background rects for the trellis plots
var parseDate = d3.timeParse('%b %Y');
// To speed things up, we have already computed the domains for your scales
var dateDomain = [new Date(2000, 0), new Date(2010, 2)];
var priceDomain = [0, 223.02];

svg.selectAll('.background')
    .data(['A', 'B', 'C', 'C']) // dummy data
    .enter()
    .append('rect') // Append 4 rectangles
    .attr('class', 'background')
    .attr('width', trellisWidth) // Use our trellis dimensions
    .attr('height', trellisHeight)
    .attr('transform', function(d, i) {
        // Position based on the matrix array indices.
        // i = 1 for column 1, row 0)
        var tx = (i % 2) * (trellisWidth + padding.l + padding.r) + padding.l;
        var ty = Math.floor(i / 2) * (trellisHeight + padding.t + padding.b) + padding.t;
        return 'translate('+[tx, ty]+')';
    });

// **** How to properly load data ****

d3.csv('stock_prices.csv').then(function(dataset) {

// **** Your JavaScript code goes here ****

    // Format data
    const groupedData = d3.nest()
        .key(d => d.company)
        .entries(dataset.map((p) => {
            return {
                company: p.company,
                date: parseDate(p.date),
                price: +p.price,
            }
        }))
    
    // Base chart
    const charts = svg.selectAll('.trellis')
        .data(groupedData)
        .enter()
        .append('g')
        .attr('transform', function(d, i) {
            var tx = (i % 2) * (trellisWidth + padding.l + padding.r) + padding.l;
            var ty = Math.floor(i / 2) * (trellisHeight + padding.t + padding.b) + padding.t;
            return 'translate('+[tx, ty]+')';
        })

    // Axes
    const xScale = d3.scaleTime()
        .domain(dateDomain)
        .range([0, trellisWidth]);
    const yScale = d3.scaleLinear()
        .domain(priceDomain)
        .range([trellisHeight, 0]);
    const lineInterpolate = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.price));
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)
    charts.append('g')
        .attr("class", "x axis")
        .call(xAxis)
        .attr("transform", `translate(0, ${trellisHeight})`)
    charts.append('g')
        .attr("class", "y axis")
        .call(yAxis)
    
    // colors
    const colors = d3.scaleOrdinal()
        .domain(groupedData.map(d => d.key))
        .range(d3.schemeCategory10.slice(0, 4))
        
    // Actual lines
    charts.append('path')
        .attr('class', 'line-plot')
        .attr('stroke', d => colors(d.key))
        .datum(d => d.values)  // need this to load in data, not sure why I used datum
        .attr('d', lineInterpolate)
});

// Remember code outside of the data callback function will run before the data loads