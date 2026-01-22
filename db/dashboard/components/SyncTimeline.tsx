
import React, { useEffect, useRef } from 'react';
import { select, range } from 'd3';
import { Task } from '../../../types';

interface SyncTimelineProps {
  tasks: Task[];
}

const SyncTimeline: React.FC<SyncTimelineProps> = ({ tasks }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || tasks.length === 0) return;

    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 300;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };

    const nodes = tasks.map((t, i) => {
      // Calculate radius based on priority
      let radius = 8;
      if (t.priority === 'high') radius = 14;
      if (t.priority === 'low') radius = 5;

      return {
        ...t,
        radius,
        x: margin.left + (i * (width - margin.left - margin.right)) / (tasks.length - 1 || 1),
        y: height / 2 + (Math.sin(i) * 50)
      };
    });

    svg.append("g")
      .attr("class", "grid")
      .selectAll("line")
      .data(range(0, width, 50))
      .enter()
      .append("line")
      .attr("x1", d => d)
      .attr("x2", d => d)
      .attr("y1", 0)
      .attr("y2", height)
      .attr("stroke", "#1e293b")
      .attr("stroke-width", 1)
      .attr("opacity", 0.3);

    const links = nodes.slice(0, -1).map((n, i) => ({
      source: n,
      target: nodes[i + 1],
      active: n.synced && nodes[i+1].synced
    }));

    svg.selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("d", d => `M ${d.source.x} ${d.source.y} Q ${(d.source.x + d.target.x) / 2} ${height} ${d.target.x} ${d.target.y}`)
      .attr("fill", "none")
      .attr("stroke", d => d.active ? "#06b6d4" : "#334155")
      .attr("stroke-width", d => d.active ? 2 : 1)
      .attr("stroke-dasharray", d => d.active ? "none" : "4,4")
      .attr("opacity", 0.5);

    const nodeGroups = svg.selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    // Glow effect for high priority
    nodeGroups.filter(d => d.priority === 'high').append("circle")
      .attr("r", d => d.radius + 4)
      .attr("fill", d => {
        if (d.category === 'work') return '#3b82f633';
        if (d.category === 'personal') return '#10b98133';
        if (d.category === 'growth') return '#8b5cf633';
        return '#64748b33';
      })
      .attr("class", "animate-pulse");

    nodeGroups.append("circle")
      .attr("r", d => d.radius)
      .attr("fill", d => {
        if (d.category === 'work') return '#3b82f6';
        if (d.category === 'personal') return '#10b981';
        if (d.category === 'growth') return '#8b5cf6';
        return '#64748b';
      })
      .attr("stroke", "#020617")
      .attr("stroke-width", 2)
      .attr("class", "transition-all duration-500 hover:scale-125 cursor-pointer");

    nodeGroups.append("text")
      .attr("dy", d => -d.radius - 10)
      .attr("text-anchor", "middle")
      .attr("fill", "#94a3b8")
      .attr("font-size", "9px")
      .attr("font-family", "monospace")
      .attr("font-weight", d => d.priority === 'high' ? 'bold' : 'normal')
      .text(d => d.title.length > 12 ? d.title.substring(0, 10) + '...' : d.title);

    nodeGroups.append("text")
      .attr("dy", d => d.radius + 15)
      .attr("text-anchor", "middle")
      .attr("fill", d => d.priority === 'high' ? '#ef4444' : '#475569')
      .attr("font-size", "7px")
      .attr("font-family", "monospace")
      .attr("text-transform", "uppercase")
      .text(d => d.priority);

  }, [tasks]);

  return (
    <div className="w-full bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center">
          <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2 animate-pulse" />
          Neural Sync Map
        </h4>
        <div className="flex items-center space-x-4">
           <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              <span className="text-[8px] mono text-slate-700 uppercase">Weight-by-Priority</span>
           </div>
           <span className="text-[10px] mono text-slate-600">Active Nodes: {tasks.filter(t => t.synced).length}/{tasks.length}</span>
        </div>
      </div>
      <svg ref={svgRef} viewBox="0 0 800 300" className="w-full h-auto" />
    </div>
  );
};

export default SyncTimeline;
