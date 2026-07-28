const width = 1400;
const height = 850;

const margin = {
    top:70,
    right:80,
    bottom:70,
    left:80
};

const svg = d3.select("#chart")
.append("svg")
.attr("width",width)
.attr("height",height);

const tooltip = d3.select("body")
.append("div")
.attr("class","tooltip");

d3.csv("data/What is The Best Performing Marvel Movie_ PUBLIC DATA - Marvel Movies.csv")
.then(function(data){

    data.forEach(d=>{

        d["critics % score"] = parseFloat(d["critics % score"]);

        d["audience % score"] = parseFloat(d["audience % score"]);

        d["worldwide gross"] = +d["worldwide gross"];

    });

    const x = d3.scaleLinear()
    .domain([0,100])
    .range([margin.left,width-margin.right]);

    const y = d3.scaleLinear()
    .domain([0,100])
    .range([height-margin.bottom,margin.top]);

    const radius = d3.scaleSqrt()
    .domain(d3.extent(data,d=>d["worldwide gross"]))
    .range([8,42]);

    const color = d3.scaleOrdinal(d3.schemeTableau10);

    // Grid

    svg.append("g")
    .attr("class","grid")
    .attr("transform",`translate(0,${height-margin.bottom})`)
    .call(
        d3.axisBottom(x)
        .ticks(10)
        .tickSize(-(height-margin.top-margin.bottom))
        .tickFormat("")
    );

    svg.append("g")
    .attr("class","grid")
    .attr("transform",`translate(${margin.left},0)`)
    .call(
        d3.axisLeft(y)
        .ticks(10)
        .tickSize(-(width-margin.left-margin.right))
        .tickFormat("")
    );

    // Axes

    svg.append("g")
    .attr("transform",`translate(0,${height-margin.bottom})`)
    .call(d3.axisBottom(x));

    svg.append("g")
    .attr("transform",`translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

    // Axis Labels

    svg.append("text")
    .attr("x",width/2)
    .attr("y",height-20)
    .attr("text-anchor","middle")
    .style("font-size","18px")
    .text("Critics Score");

    svg.append("text")
    .attr("transform","rotate(-90)")
    .attr("x",-height/2)
    .attr("y",25)
    .attr("text-anchor","middle")
    .style("font-size","18px")
    .text("Audience Score");

    // Circles

    svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx",d=>x(d["critics % score"]))
    .attr("cy",d=>y(d["audience % score"]))
    .attr("r",d=>radius(d["worldwide gross"]))
    .attr("fill",d=>color(d.category))
    .attr("stroke","white")
    .attr("stroke-width",2)
    .attr("opacity",0.9)
    .on("mousemove",(event,d)=>{

        tooltip
        .style("opacity",1)
        .style("left",(event.pageX+15)+"px")
        .style("top",(event.pageY-20)+"px")
        .html(
            "<b>"+d.film+"</b><br>" +
            "Critics : "+d["critics % score"]+"%<br>" +
            "Audience : "+d["audience % score"]+"%<br>" +
            "Worldwide Gross : $"+d["worldwide gross"]+" M"
        );

    })
    .on("mouseout",()=>{

        tooltip.style("opacity",0);

    });

    // Labels

    svg.selectAll(".movieLabel")
    .data(data)
    .enter()
    .append("text")
    .attr("class","movieLabel")
    .attr("x",d=>x(d["critics % score"]))
    .attr("y",d=>y(d["audience % score"])+3)
    .text(d=>d.film);

});