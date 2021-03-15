// eslint-disable-next-line no-use-before-define
import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { RawDraftContentState } from 'draft-js'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import { CardActionArea } from '@material-ui/core'
import { Link } from 'react-router-dom'

type Props = {
  article: {
    articleId: number
    title: string
    imageUrl: string
    category: number
    content: RawDraftContentState
    abstract: string
    userName: string
    createdAt: string
    updatedAt: string
  }
}

// const apiUrl = '/api'

const RecipeReviewCard: React.FC<Props> = (props) => {
  const article = props.article
  const classes = useStyles()
  const [up, setUp] = React.useState(2)

  const onElevation = () => {
    setUp(10)
  }
  const offElevation = () => {
    setUp(2)
  }

  return (
    <Card
      variant="elevation"
      elevation={up}
      className={classes.root}
      onMouseOver={onElevation}
      onMouseOut={offElevation}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {article.userName}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={article.title}
        subheader={article.createdAt}
      />
      <CardActionArea component={Link} to={'/' + article.userName + '/' + article.articleId}>
        <CardMedia
          component="div"
          className={classes.media}
          image={article.imageUrl}
          title={article.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {article.abstract}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      marginTop: '1.5rem',
      marginBottom: '1.5rem'
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    },
    avatar: {
      backgroundColor: red[500]
    }
  })
)

export default RecipeReviewCard
