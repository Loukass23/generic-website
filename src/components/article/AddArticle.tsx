import React from 'react';
import clsx from 'clsx';
import { Theme, createStyles, withStyles, ThemeProvider } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Input, FormControl, InputLabel } from '@material-ui/core';
import theme from '../../theme';



const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },

    responsiveField: {
        width: '70vw',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },

})

interface State {
    name: string;
    age: string;
    multiline: string;
}

interface Props {
    classes: any

}
const ValidationTextField = withStyles({
    root: {
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:invalid + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style
        },
    },
})(TextField);

const AddArticle: React.FC<Props> = ({ classes }) => {

    const [values, setValues] = React.useState<State>({
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled'
    });

    const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <form className={classes.container} color="secondary" autoComplete="off">

            <TextField
                InputLabelProps={
                    classes.formLabelFocused
                }

                color=""
                required
                id="filled-required"
                label="Title"
                defaultValue="Title"
                className={clsx(classes.responsiveField, classes.textField)}
                margin="normal"
                variant="filled"
            />

            <Input

                id="image-input"
                className={classes.responsiveField}
                // accept="image/*"
                type="file"
            // multiple
            // {...input}
            // onChange={(e) => {
            //     this.setState({ file: e.target.files[0], isUploading: true }, this.handleUpload)
            // }} 
            />
            <TextField
                color="secondary"

                id="filled-multiline-static"
                label="Article"
                multiline
                rows="10"
                defaultValue="Type your content here"
                className={clsx(classes.responsiveField, classes.textField)}
                margin="normal"
                variant="filled"
            />
        </form>
    );
}
export default withStyles(styles)(AddArticle)
