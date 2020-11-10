class Graph {
    constructor(opts) {
        this.nodes = opts.nodes;
        // map source and target id to respective node
        this.edges = opts.edges.map(
            e => {
                return {
                    source: this.nodes.find(n => n.id == e.source),
                    target: this.nodes.find(n => n.id == e.target)
                }
            });
        this.element = opts.element;
        this.draw();
    }

    draw() {
        this.width = 500;
        this.height = 500;
        const svg = this.element.append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .style("border", "solid 1px");

        this.plot = svg.append('g');
        // circles need to be added last to be drawn above the paths
        this.paths = this.plot.append('g').classed('edges', true);
        this.circles = this.plot.append('g').classed('nodes', true);

        this.addEdges();
        this.addNodes();
    }

    addNodes() {
        this.circles.selectAll("circle .nodes")
            .data(this.nodes)
            .enter()
            .append("svg:circle")
            .attr("class", "nodes")
            .attr("cx", d => { return d.x; })
            .attr("cy", d => { return d.y; })
            .attr("r", "10px")
            .attr("stroke", "black")
            .attr("fill", "white")
            .exit()
            .remove();
    }

    addEdges() {
        this.paths.selectAll(".line")
            .data(this.edges)
            .enter()
            .append("path")
            .attr("d", d => {
                return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y;
            })
            .style("stroke", "red")
            .exit()
            .remove();
    }
}

const chart = new Graph({
    element: d3.select("#graph"),
    nodes: [{ id: 1, title: "A", x: 30, y: 50 },
    { id: 2, title: "B", x: 150, y: 80 },
    { id: 3, title: "C", x: 90, y: 120 }],
    edges: [
        { source: 1, target: 2 },
        { source: 2, target: 3 }
    ]
})