import tree from './tree.json'

const member_list = tree.members
const initialNode = [{
    id: tree.members[0].id,
    position: { x: 0, y: 0 },
    data: { label: tree.members[0].name, parents: tree.members[0].parents, children: tree.members[0].children, spouse: tree.members[0].spouse},
    type: 'customNode'
}];

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
    for (let i = 0; i < siblings.length; i++) {
        if (id === siblings[i]) return i
    }

    throw new Error('Not in siblings')
}

const renderSpouse = (member, nodes, edges) => {
    if (member.data.spouse) {
        let spouse = getSelf(member.data.spouse)

        nodes.push({
            id: spouse.id,
            position: { x: member.position.x + 300, y: member.position.y },
            data: { label: spouse.name, parents: spouse.parents, children: spouse.children, spouse: spouse.spouse},
            type: 'customNode'
        })

        return [member.position.x + 150, member.position.y]
    }

    return [member.position.x, member.position.y]
}

const renderChildren = (member, x_middle, y_middle, nodes, edges) => {
    let x_start = x_middle - 150 * (member.data.children.length - 1)
    let y_start = y_middle + 100

    member.data.children.forEach((e, i) => {
        let child = getSelf(e)

        nodes.push({
            id: child.id,
            position: { x: x_start + 300 * i, y: y_start },
            data: { label: child.name, parents: child.parents, children: child.children, spouse: child.spouse},
            type: 'customNode'
        })

        getParents(child.id).forEach(parent => {
            edges.push({ 
                id: parent.id + "-" + child.id, 
                source: parent.id, 
                target: child.id, 
                type: 'step' 
            });
        })
    })
}



export { renderChildren, renderSpouse, getSelf, initialNode }


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