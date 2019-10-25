import React from 'react'
import { iconList, iconsRender } from '../Icons'

interface Props {
}

const AddTab: React.FC<Props> = () => {
    console.log('iconList :', iconList);
    return (
        <div>
            {iconList.map(icon => {
                console.log('icon :', icon);
                return iconsRender('add')
            })
            }

        </div>
    )
}

export default AddTab
