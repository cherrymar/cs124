import Rating from '@mui/material/Rating';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
root: {
    margin: "0 10px",
    "& > * + *": {
    marginTop: theme.spacing(1)
    }
},
emptyStar: {
    color: "gray"
}
}));


const StarsRating = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <Rating
            value={props.value}
            defaultValue={props.defaultValue}
            max={3}
            size="small"
            emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.emptyStar} />}
            // onChange={props.onChange}
            onChange={props.onChange}
        />
        </div>
    );
};
export default StarsRating; 