import React from 'react';
import TemplateActions from './TemplateActions';
import useTextTransform from '../../../hooks/useTextTransform';
import { Link } from 'react-router-dom';

function TemplateTableRow({row, reset}){
    const {capitalizeName} = useTextTransform();
    return(
        <tr className="table-row">
            <td>
                <Link to={`/discoveryquestions/templates/${row.id}`}>
                    {row.name.charAt(0).toUpperCase() + row.name.slice(1)}
                </Link>
            </td>
            <td>{capitalizeName(row.author)}</td>
            <td>{row.count}</td>
            <td>{new Date(row.updated).toLocaleDateString()}</td>
            <TemplateActions row={row} reset={reset}/>
        </tr>
    )
}

export default TemplateTableRow;