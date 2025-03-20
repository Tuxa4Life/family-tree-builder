import { Controls, ReactFlow, Background } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { useState, useEffect } from "react";
import CustomNode from "./CustomNode";
import { getSelf, getParents, getChildren } from "./functions";

const initialNodes = [
    { id: '0', position: { x: 0, y: 0 }, data: { label: 'Root' } },
];

const initialEdges = [];

const App = () => {
    const [nodes, setNodes] = useState(initialNodes)
    const [edges, setEdges] = useState(initialEdges)
 
    useEffect(() => {
        console.log(getSelf("2"))
        console.log(getParents("2"))
        console.log(getChildren("2"))
    }, [])

    const nodeTypes = {
        customNode: CustomNode,
    };

    return <div style={{ width: '90vw', height: '90vh', border: '1px black solid', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
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