import Box from '../Box';
import {ProfileRelationsBoxWrapper} from '../ProfileRelations';

const BoxContainer = (props) => {
    return (
        <Box>
            <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
                {props.title} ({props.info.length})
            </h2>
            <ul>
                {
                    props.info.filter((item, idx) => idx <= 5).map((object, index) => {
                        return(
                            <li key={new Date().getTime + index}>
                                <a href={`/${props.title}/${object.title}`} key={object.title}>
                                    <img src={object.image}/>
                                    <span>{object.title}</span>
                                    </a>
                             </li>
                        );
                    })
                }
            </ul>
            </ProfileRelationsBoxWrapper>
        </Box>
    )
}

export default BoxContainer;