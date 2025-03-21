import { Controls, ReactFlow, Background } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { useState, useEffect } from "react";
import CustomNode from "./CustomNode";
import { initialNode, renderSpouse, renderChildren, getSelf, getIndexInNodes } from "./functions";



const initialEdges = [];

const App = () => {
    const [nodes, setNodes] = useState(initialNode)
    const [edges, setEdges] = useState(initialEdges)

    const buildTree = () => {
        let nodes = initialNode
        let edges = []
    
        let aux = (start_node) => {
            let [x_middle, y_middle] = renderSpouse(start_node, nodes, edges)
            renderChildren(start_node, x_middle, y_middle, nodes, edges)

            if (start_node.data.children.length !== 0) {
                start_node.data.children.forEach(id => {
                    aux(nodes[getIndexInNodes(id, nodes)])
                })
            }
        }
    
        aux(nodes[0])
    
        setNodes([...nodes])
        setEdges([...edges])
    }
 
    useEffect(() => {
        buildTree()
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