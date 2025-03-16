import { Handle } from "@xyflow/react";
import { useState } from "react";

const CustomNode = ({ data }) => {
    const [hovered, setHovered] = useState(false)

    return <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ position: 'relative', textAlign: 'center', padding: '10px', border: '1px solid black', borderRadius: '5px', backgroundColor: 'white' }}>
        <div>{data.label}</div>
        <div style={{ marginTop: '5px', fontSize: '12px', color: 'gray' }}>
            <i className="birthday cake icon"></i> 
            {data.dob}
        </div>

        {
            hovered ? <>
                <div title="Add Parent" style={{ position: 'absolute', top: '0%', left: '51%', transform: 'translate(-50%, -100%)', fontSize: '18px' }} className="add-parent"><i className="plus square outline icon"></i></div>
                <div title="Add Child" style={{ position: 'absolute', top: '100%', left: '51%', transform: 'translate(-50%, 0%)', fontSize: '18px' }} className="add-child"><i className="plus square outline icon"></i></div>
                <div title="Add Partner" style={{ position: 'absolute', top: '50%', left: '0', transform: 'translate(-86%, -50%)', fontSize: '18px' }} className="add-parent"><i className="plus square outline icon"></i></div>
                <div title="Add Sibling" style={{ position: 'absolute', top: '50%', left: '100%', transform: 'translate(0%, -50%)', fontSize: '18px' }} className="add-parent"><i className="plus square outline icon"></i></div>
            </> : null
        }

        <Handle
            type="target"
            position="top"
            style={{ background: '#555' }}
        />
        <Handle
            type="source"
            position="bottom"
            style={{ background: '#555' }}
        />
    </div>
};

export default CustomNode;