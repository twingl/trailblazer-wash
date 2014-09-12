(function() {
  'use strict';
  /**
   *  Render cleaned data
   */
  // Convert our data structure into one that d3 can render
  var d3ify = function(data) {
    // Initialize the final containers that will be given to D3 to render
    var links = [];
    var nodes = [];

    // We need to convert our trees into a list of nodes and links.
    // Keep track of the index so that we can associate the array of nodes/links
    // with their respective locations in the original object
    var index = 0;
    var idMap = {};

    // Iterate over nodes to insert them into an array with known indices
    _.each(data.nodes, function(node, nodeId) {
      // Record the relationship between index and location in the original
      // object
      idMap[node.id] = {
        index: index++,
        treeId: node.treeId,
        nodeId: node.id
      };

      // Add the node to the rendering list of nodes
      nodes.push(node);
    });

    // Iterate over the nodes a second time to create links
    _.each(data.nodes, function(node, nodeId) {
      // Add a link to the rendering list if there's a relationship present.
      // Note the directionality: parentNode -> node
      if (node.parentId && idMap[node.parentId]) {
        links.push({
          source: idMap[node.parentId].index,
          target: idMap[node.id].index
        });
      }
    });

    return {
      nodes: nodes,
      links: links
    };
  };

  var syntaxHighlight = function(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  };

  // Rendering function - takes the format returned by d3ify(), i.e.
  // render("selector", {nodes: nodes[], links: links[] })
  var render = function(selector, data) {
    var tip = d3.tip()
      .direction("e")
      .offset([0, 10])
      .attr("class", "d3-tip")
      .html(function(d) {
        return "<pre>" + syntaxHighlight(JSON.stringify(d, null, 3)) + "</pre>";
      });

    var width = 960,
        height = 500;

    var force = d3.layout.force()
      .linkDistance(80)
      .charge(-300)
      .size([width, height]);

    var svg = d3.select(selector).append("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .call(d3.behavior.zoom().scaleExtent([.5, 4]).on("zoom", zoom))
        .append("g");

    svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height);

    function zoom() {
      svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

    force.nodes(data.nodes).links(data.links).start();

    var link = svg.selectAll(".link")
          .data(data.links)
          .enter()
            .append("line")
              .attr("class", "link");
    
    var gnodes = svg.selectAll(".node")
          .data(data.nodes)
          .enter()
            .append("svg:a")
            .attr('xlink:href', function(d) { return d.url })
          .append('g');

    var nodes = gnodes.append("circle")
              .attr("class", "node")
              .attr("r", 20);


/** Kept as reference, Moving styling to style.css
              .style("fill", function(d) {
                return ( d.parentId ? "rgba(0,225,0" : "rgba(0,0,255" )
                  + ( d.recording ? ",1)" : ",0.1)" );
              })
              .style("stroke", "rgba(0,100,100,1)")
              .style("stroke-width", function(d) {
                return (d.openTab) ? "2" : "0";
              });
*/ 
  

    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      nodes.attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    });

    svg.call(tip);
    svg.selectAll(".node")
      .data(data.nodes)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
  };

  var assignmentId;

  if (window.location.hash) {
    var o = {};
    _.each(window.location.hash.substring(1).split('&'), function(i) {
      var kv = i.split('=');
      o[kv[0]] = kv[1];
    });
    assignmentId = parseInt(o.assignment);
  };

  var getMap =  function(assignmentId) {
    chrome.runtime.sendMessage({ action: "getMap", assignmentId: assignmentId }, function(response) {
        if (response.data && response.data.nodes && Object.keys(response.data.nodes).length > 0) {
          render("#map", d3ify( response.data ));
        };
      });
  };

  //listen for updates to an assignment's nodes and render map
  chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if (request.assignmentId === assignmentId) {
      getMap(assignmentId);
    };  
  });

  getMap(assignmentId);
}());