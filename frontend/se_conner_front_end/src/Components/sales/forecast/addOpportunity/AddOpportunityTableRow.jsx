import React, {useMemo} from "react";




function AddOpportunityTableRow({data, addOpportunity, current_opps}){
    const checked = useMemo(()=>{
        if(!current_opps) return false;
        return current_opps.includes(data.id);
    }, [current_opps, data.id]);

    return(
        <tr>
            <td>
                <input type="checkbox" 
                        checked={checked}
                        value={data.id}
                        onChange={(e)=> addOpportunity(e.target.value)}
                        />
            </td>
            <td>{data?.name}</td>
            <td>{`$ ${data?.value}`}</td>
            <td>{data.company}</td>
            <td>{data.status}</td>
            <td>{data.close_date}</td>
            <td>{data.products}</td>
        </tr>
    )
}

export default AddOpportunityTableRow;