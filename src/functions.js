import tree from './tree.json'

const members = tree.members

const getSelf = (id) => {
    for (let i = 0; i < members.length; i++) {
        if (members[i].id === id) return members[i]
        if (i == members.length - 1) return {}
    }
}
 
const getParents = (id) => {
    for (let i = 0; i < members.length; i++) {
        if (members[i].id === id) {
            let output = []
            members[i].parents.forEach(e => {
                output.push(getSelf(e))
            })

            return output
        }

        if (i == members.length - 1) return []
    }
}

const getChildren = (id) => {
    for (let i = 0; i < members.length; i++) {
        if (members[i].id === id) {
            let output = []
            members[i].children.forEach(e => {
                output.push(getSelf(e))
            })

            return output
        }

        if (i == members.length - 1) return []
    }
}


const buildTree = () => {
    let nodes = []
    let edges = []

    let x, y = 0

    for (let i = 0; i < members.length; i++) {
        let e = members[i]
        nodes.push({
            id: `${e.id}`,
            position: { x, y },
            data: { label: e.name, parents: e.parents, children: e.children },
            type: 'customNode'
        });
    }
}

export { getSelf, getParents, getChildren }


// const buildTree = (root) => {
//     let nodes = []
//     let edges = []

//     const aux = (node, x, y) => {
//         nodes.push({
//             id: `${node.id}`,
//             position: { x, y },
//             data: { label: node.name, parents: node.parents, children: node.children, dob: node.dob },
//             type: 'customNode'
//         });

//         if (node.children.length === 0) return x;

//         let totalWidth = node.children.length * 400;
//         let startX = x - totalWidth / 2 + 200;

//         node.children.forEach((child, i) => {
//             if (typeof (child) === 'number') {
//                 edges.push({ id: `${node.id}-${child}`, source: `${node.id}`, target: `${child}`, type: 'step' });
//                 return
//             }

//             let childX = startX + i * 400;
//             edges.push({ id: `${node.id}-${child.id}`, source: `${node.id}`, target: `${child.id}`, type: 'step' });
//             aux(child, childX, y + 150)
//         });
//     };

//     aux(root, 0, 0);
//     setNodes(nodes);
//     setEdges(edges);
// }