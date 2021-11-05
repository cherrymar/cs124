import Rating from '@mui/material/Rating';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexDirection: "column",
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
        defaultValue={props.defaultValue}
        max={3}
        size="small"
        emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.emptyStar} />}
        onChange={props.onChange}
      />
    </div>
  );
};
export default StarsRating;