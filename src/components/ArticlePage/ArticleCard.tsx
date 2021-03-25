// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import qs from 'qs'

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
import { Box, CardActionArea, Chip } from '@material-ui/core'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

type Props = {
  article: {
    id: number
    title: string
    imageUrl: string
    category: number
    abstract: string
    userId: number
    createdAt: string
    updatedAt: string
    isFavorite: boolean
    favoriteCount: number
    user: { codename: string; avatarUrl: string }
  }
}
const categories = ['pet', 'sports', 'novel', 'IT', 'food']

const ArticleCard: React.FC<Props> = (props) => {
  const classes = useStyles()
  const userId = useSelector((state) => state.authReducer.id)
  const article = props.article
  const [favoriteCount, setFavoriteCount] = useState(article.favoriteCount)
  const [favoriteState, setFavoriteState] = useState(props.article.isFavorite)

  const history = useHistory()
  const [up, setUp] = React.useState(2)

  const onElevation = () => {
    setUp(10)
  }
  const offElevation = () => {
    setUp(2)
  }

  const favoriteHandler = async () => {
    try {
      const { data } = await axios.post(
        '/api/favorite',
        qs.stringify({ userId, articleId: article.id })
      )
      if (!data) {
        history.push('/login')
      } else {
        setFavoriteCount(data.favoriteCount)
        setFavoriteState(data.isFavorite)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const favoriteColor = favoriteState ? 'error' : 'inherit'

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
          <a href={'/' + article.user.codename}>
            <Avatar
              aria-label="recipe"
              src={process.env.PUBLIC_URL + '/' + article.user.avatarUrl}
            />
          </a>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={article.title}
        subheader={article.createdAt}
        className={classes.cardHeader}
      />
      <CardActionArea component="a" href={'/' + article.user.codename + '/' + article.id}>
        <CardMedia
          component="div"
          className={classes.media}
          image={article.imageUrl}
          title={article.title}
        />
      </CardActionArea>
      <CardContent className={classes.abstract}>
        <Typography variant="body2" color="textSecondary" component="p">
          {article.abstract}
        </Typography>
      </CardContent>
      <Box className={classes.buttonActions}>
        <Chip
          className={classes.chips}
          size="small"
          label={categories[article.category].toUpperCase()}
          color="primary"
        />
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={favoriteHandler}>
            <FavoriteIcon color={favoriteColor} />
          </IconButton>
          <Typography variant="body2" color="textSecondary" component="p">
            {favoriteCount}
          </Typography>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      marginTop: '1.5rem',
      marginBottom: '1.5rem',
      flexGrow: 1
    },
    cardHeader: {
      height: '20%'
    },
    media: {
      height: '56.25%',
      paddingTop: '56.25%' // 16:9
    },
    onFavorite: {
      backgroundColor: red[300]
    },
    chips: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2)
    },
    abstract: {
      height: '13.75%'
    },
    buttons: {
      marginButtom: theme.spacing(3)
    },
    buttonActions: {
      height: '10%'
    }
  })
)

export default ArticleCard
