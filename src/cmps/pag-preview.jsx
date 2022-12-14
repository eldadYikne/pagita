import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
export function PugPreview({ pag }) {


    return <div className="pag-preview">
            {pag.gender === 'female' ? <FemaleIcon /> : <MaleIcon />}
        <div className='parent-name'>
            <h3 className="id">{pag.id} </h3>
            <h3>{pag.parentsName} </h3>
        </div>
    </div>
}