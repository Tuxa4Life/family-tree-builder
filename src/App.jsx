import { Controls, ReactFlow, Background } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { useState, useEffect } from "react";
import json from './tree.json';
import CustomNode from "./CustomNode";

const initialNodes = [
    { id: '0', position: { x: 0, y: 0 }, data: { label: 'Root' } },
];

const initialEdges = [];

const App = () => {
    const [nodes, setNodes] = useState(initialNodes)
    const [edges, setEdges] = useState(initialEdges)

    const buildTree = (root) => {
        let nodes = []
        let edges = []

        const aux = (node, x, y) => {
            nodes.push({
                id: `${node.id}`,
                position: { x, y },
                data: { label: node.name, parents: node.parents, children: node.children, dob: node.dob },
                type: 'customNode'
            });

            if (node.children.length === 0) return x;

            let totalWidth = node.children.length * 300;
            let startX = x - totalWidth / 2 + 150;

            node.children.forEach((child, i) => {
                if (typeof (child) === 'number') {
                    edges.push({ id: `${node.id}-${child}`, source: `${node.id}`, target: `${child}`, type: 'step' });
                    return
                }

                let childX = startX + i * 300;
                edges.push({ id: `${node.id}-${child.id}`, source: `${node.id}`, target: `${child.id}`, type: 'step' });
                aux(child, childX, y + 150)
            });
        };

        aux(root, 0, 0);
        setNodes(nodes);
        setEdges(edges);
    }

    useEffect(() => {
        buildTree(json.root)
    }, [])

    const nodeTypes = {
        customNode: CustomNode,
    };

    return <div style={{ width: '90vw', height: '90vh', border: '1px black solid', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            nodesConnectable={false}
            nodesDraggable={false}
            onNodeClick={(_, node) => console.log(node)}
            nodeTypes={nodeTypes}
            minZoom={0.1}
            maxZoom={5}
        >
            <Controls />
            <Background variant="dots" gap={25} size={1} />
        </ReactFlow>
    </div>
}

export default App;