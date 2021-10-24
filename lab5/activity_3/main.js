// Global function called when select element is changed
function onCategoryChanged() {
    var select = d3.select('#categorySelect').node();
    // Get current value of select element
    var category = select.options[select.selectedIndex].value;
    // Update chart with the selected category of letters
    letterGroup = category;
    updateChart(letterGroup);
}

// Global variable for type of letters
let letterGroup = 'all-letters';

// recall that when data is loaded into memory, numbers are loaded as strings
// this function helps convert numbers into string during data preprocessing
function dataPreprocessor(row) {
    return {
        letter: row.letter,
        frequency: +row.frequency
    };
}

var svg = d3.select('svg');

// Get layout parameters
var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

var padding = {t: 60, r: 40, b: 30, l: 40};

// Compute chart dimensions
var chartWidth = svgWidth - padding.l - padding.r;
var chartHeight = svgHeight - padding.t - padding.b;

// Compute the spacing for bar bands based on all 26 letters
var barBand = chartHeight / 26;
var barHeight = barBand * 0.7;

// Create a group element for appending chart elements
var chartG = svg.append('g')
    .attr('transform', 'translate('+[padding.l, padding.t]+')');

// A map with arrays for each category of letter sets
var lettersMap = {
    'all-letters': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    'only-consonants': 'BCDFGHJKLMNPQRSTVWXZ'.split(''),
    'only-vowels': 'AEIOUY'.split('')
};

d3.csv('letter_freq.csv', dataPreprocessor).then(function(dataset) {
    // Create global variables here and intialize the chart
    letters = dataset;

    // chart title
    svg.append('text')
        .attr('transform', `translate(${svgWidth / 2}, 30)`)
        .attr('class', 'axis-label')
        .text('Letter Frequency (%)');
    
    // top axis
    frequency = d3.scaleLinear()
        .domain([0, Math.ceil(1.1 * d3.max(dataset, function(d) { return d.frequency; }) * 100) / 100]) // round up to nearest hundredth
        .range([0, chartWidth]);
    const xAxis = d3.axisTop()
        .scale(frequency)
        .tickFormat(d3.format(".0%"));
    svg.append("g")
        .style("font-size", "6px")
        .attr("transform", `translate(${padding.l},${padding.t})`)
        .call(xAxis);
    
    // cutoff logic
    var main = document.getElementById('main');
    const cutoffInput = document.getElementById('cutoff');
    d3.select(main)
        .append('p')
        .append('button')
        .style("border", "1px solid black")
        .text('Filter Data')
        .on('click', function() {
            // Add code here
            const cutoffvalue = parseFloat(cutoffInput.value);
            if (isNaN(cutoffvalue)) {
                letters = dataset;
            } else {
                letters = dataset.filter(function(d) {
                    return d.frequency >= cutoffvalue;
                });
            }
            updateChart(letterGroup);
        });

    // Update the chart for all letters to initialize
    updateChart('all-letters');
});


function updateChart(filterKey) {
    // Create a filtered array of letters based on the filterKey
    var filteredLetters = letters.filter(function(d){
        return lettersMap[filterKey].indexOf(d.letter) >= 0;
    });

    // **** Draw and Update your chart here ****
    const bars = chartG.selectAll('.bar')
        .data(filteredLetters, function(d) { return d.letter; });
    
    const barsEnter = bars.enter()
        .append('g')
        .attr('class', 'bar');
    
    bars.merge(barsEnter)
        .attr('transform', function(_, i) {
            return 'translate('+[0, i * barBand + 5]+')';
        });

    barsEnter.append('rect')
        .attr('width', function(d) {
            return frequency(d.frequency);
        })
        .attr('height', barHeight)
        .attr('fill', 'black')
    
    barsEnter.append('text')
        .attr("dy", "1em")
        .attr('x', -12)
        .style('font-size', '10px')
        .text(function(d) {
            return d.letter;
        });
    
    bars.exit().remove();
}
