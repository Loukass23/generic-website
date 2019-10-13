import React from 'react'
import { Theme, createStyles, Typography, Container } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import { type } from 'os';


interface Bock {

    title: string,
    text: string,
    img: string,

}
type TabArticle = Array<Bock>

const styles = (theme: Theme) => createStyles({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        // marginBottom: theme.spacing(1),
        // backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        // [theme.breakpoints.up('xs')]: {
        //     padding: theme.spacing(6),
        //     paddingRight: 0,
        // },
    },
});

interface Props extends WithStyles<typeof styles> {
    classes: any,
    content: TabArticle
}


const TabArticle: React.FC<Props> = ({ classes, content }) => {

    return (
        <div>
            {
                content.map(block => (
                    <Container key={block.title}>
                        <Typography component="h2" variant="h5">
                            {block.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {block.text}
                        </Typography>
                    </Container>
                ))

            }

        </div>
    )
}

export default withStyles(styles)(TabArticle)
