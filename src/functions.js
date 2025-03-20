import tree from './tree.json'

const member_list = tree.members

const getSelf = (id, members = member_list) => {
    for (let i = 0; i < members.length; i++) {
        if (members[i].id === id) return members[i]
        if (i == members.length - 1) return {}
    }
}
 
const getParents = (id, members = member_list) => {
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

const getChildren = (id, members = member_list) => {
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

const getSiblings = (id) => {
    return getParents(id).length != 0 ? getParents(id)[0].children : [id]
}

const getChildIndex = (id) => {
    let siblings =  getSiblings(id)
    for (let i = 0; i <siblings.length; i++) {
        if (id === siblings[i]) return i
    }

    throw new Error('Not in siblings')
}

const buildTree = (members = member_list) => {
    let nodes = []
    let edges = []

    let x, y = 0
    let gap = 300

    for (let i = 0; i < members.length; i++) {
        let e = members[i]

        let siblings = getSiblings(e.id)
        let childIndex = getChildIndex(e.id)

        let px_sum = 0
        console.log(e.name, e.parents)
        e.parents.forEach(parent => {
            px_sum += getSelf(parent, nodes).position.x || 0
        })
        let px_middle = px_sum / e.parents.length
        let x_start = px_middle - (gap / 2) * (siblings.length - 1)
 
        x = x_start + gap * childIndex

        nodes.push({
            id: e.id,
            position: { x, y },
            data: { label: e.name, parents: e.parents, children: e.children, spouse: e.spouse },
            type: 'customNode'
        });
    }

    return nodes
}

export { getSelf, getParents, getChildren, buildTree, getSiblings, getChildIndex }


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