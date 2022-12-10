import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "80%", marginBottom: 3 }} className="card">
      <CardHeader
        className="postHeader"
        avatar={
          <Avatar sx={{ bgcolor: "#b5179e" }} aria-label="recipe">
            R
          </Avatar>
        }
        href="/profile"
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon sx={{ color: "white" }} />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        className="postPic"
        image={require("../../assets/uploads/1.jpg")}
        alt="Paella dish"
      />
      <CardContent className="postContent">
        <Typography variant="body2" color="text.secondary">
          Meilleure saison de l'année !! 😍
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like" sx={{ color: "white" }}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="dislike" sx={{ color: "white" }}>
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton aria-label="share" sx={{ color: "white" }}>
          <ShareIcon />
        </IconButton>
        <ExpandMore
          sx={{ color: "white" }}
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="commentContainer">
          <div className="commentHeader">
            {/* <div className="commentAction">
              <ul>
                <li>Signaler</li>
                <li>Supprimer</li>
              </ul>
            </div> */}
            <Avatar sx={{ bgcolor: "#b5179e" }} aria-label="recipe">
              N
            </Avatar>
            <div className="identityComment">
              <span>Neoko</span>
              <span>le 4 décembre 2022</span>
            </div>
            <div>
              <IconButton aria-label="settings">
                <MoreVertIcon sx={{ color: "white" }} />
              </IconButton>
            </div>
          </div>
          <Typography>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
        </CardContent>
        <CardContent className="commentContainer">
          <div className="commentHeader">
            {/* <div className="commentAction">
              <ul>
                <li>Signaler</li>
                <li>Supprimer</li>
              </ul>
            </div> */}
            <Avatar sx={{ bgcolor: "#b5179e" }} aria-label="recipe">
              Z
            </Avatar>
            <div className="identityComment">
              <span>Zaerox</span>
              <span>le 4 décembre 2022</span>
            </div>
            <div>
              <IconButton aria-label="settings">
                <MoreVertIcon sx={{ color: "white" }} />
              </IconButton>
            </div>
          </div>
          <Typography>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
